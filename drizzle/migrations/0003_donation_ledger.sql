BEGIN;
-- Only verified Asaas snapshots enter this ledger. Legacy rows are not counted as money.
CREATE TABLE public.donation_donors (
 environment text NOT NULL CHECK(environment IN ('sandbox','production')),
 customer_id text NOT NULL, name text NOT NULL, email text NOT NULL,
 PRIMARY KEY(environment,customer_id)
);
CREATE TABLE public.donation_subscriptions (
 environment text NOT NULL CHECK(environment IN ('sandbox','production')),
 subscription_id text NOT NULL, donation_id uuid NOT NULL REFERENCES public.donations(id),
 customer_id text NOT NULL, status text NOT NULL, amount numeric(14,2) NOT NULL,
 next_due_date date, observed_at timestamptz NOT NULL,
 PRIMARY KEY(environment,subscription_id),
 FOREIGN KEY(environment,customer_id) REFERENCES public.donation_donors(environment,customer_id)
);
CREATE TABLE public.donation_payments (
 environment text NOT NULL CHECK(environment IN ('sandbox','production')),
 payment_id text NOT NULL, donation_id uuid NOT NULL REFERENCES public.donations(id),
 customer_id text NOT NULL, subscription_id text, status text NOT NULL,
 amount numeric(14,2) NOT NULL CHECK(amount >= 0), net_amount numeric(14,2),
 refunded_amount numeric(14,2) NOT NULL DEFAULT 0 CHECK(refunded_amount >= 0 AND refunded_amount <= amount),
 billing_type text NOT NULL, created_date date, due_date date, payment_date date, credit_date date,
 invoice_url text, receipt_url text, observed_at timestamptz NOT NULL,
 PRIMARY KEY(environment,payment_id),
 FOREIGN KEY(environment,customer_id) REFERENCES public.donation_donors(environment,customer_id)
);
CREATE INDEX donation_payments_donor ON public.donation_payments(environment,customer_id);
CREATE INDEX donation_payments_donation ON public.donation_payments(donation_id);
CREATE INDEX donation_payments_dates ON public.donation_payments(environment,payment_date,due_date);
CREATE TABLE public.donation_webhook_events (
 environment text NOT NULL, event_id text NOT NULL, event_type text NOT NULL,
 resource_id text NOT NULL, outcome text NOT NULL DEFAULT 'PROCESSED', processed_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(environment,event_id)
);
CREATE TABLE public.donation_sync_runs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), environment text NOT NULL,
 started_at timestamptz NOT NULL DEFAULT now(), finished_at timestamptz,
 status text NOT NULL DEFAULT 'RUNNING', processed integer NOT NULL DEFAULT 0,
 errors jsonb NOT NULL DEFAULT '[]', actor_id uuid, cursor_id uuid, next_cursor uuid, scheduled boolean NOT NULL DEFAULT false
);
CREATE TABLE public.donation_sync_issues (
 environment text NOT NULL, donation_id uuid NOT NULL REFERENCES public.donations(id),
 message text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(environment,donation_id)
);
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['donation_donors','donation_subscriptions','donation_payments','donation_webhook_events','donation_sync_runs','donation_sync_issues'] LOOP
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated', t);
  EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
 END LOOP;
END $$;
-- Stale snapshots cannot overwrite a newer observation. Upsert is atomic per payment.
CREATE FUNCTION public.record_donation_payment(snapshot jsonb) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE p public.donation_payments; BEGIN
 p := jsonb_populate_record(NULL::public.donation_payments, snapshot);
 INSERT INTO public.donation_payments SELECT p.*
 ON CONFLICT(environment,payment_id) DO UPDATE SET
 status=EXCLUDED.status, amount=EXCLUDED.amount, net_amount=EXCLUDED.net_amount,
 refunded_amount=EXCLUDED.refunded_amount, billing_type=EXCLUDED.billing_type,
 created_date=EXCLUDED.created_date, due_date=EXCLUDED.due_date, payment_date=EXCLUDED.payment_date, credit_date=EXCLUDED.credit_date,
 invoice_url=EXCLUDED.invoice_url, receipt_url=EXCLUDED.receipt_url, observed_at=EXCLUDED.observed_at
 WHERE donation_payments.observed_at <= EXCLUDED.observed_at;
END $$;
REVOKE ALL ON FUNCTION public.record_donation_payment(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_donation_payment(jsonb) TO service_role;

CREATE FUNCTION public.donation_dashboard(env text, filters jsonb DEFAULT '{}') RETURNS jsonb
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
WITH all_payments AS (
 SELECT p.*, d.donor_name, d.donor_email, d.project_id, coalesce(d.campaign,'Doação Geral') AS campaign
 FROM donation_payments p JOIN donations d ON d.id=p.donation_id WHERE p.environment=env
), filtered AS (
 SELECT * FROM all_payments p WHERE
 (coalesce(filters->>'search','')='' OR position(lower(filters->>'search') in lower(p.donor_name || ' ' || p.donor_email || ' ' || p.payment_id))>0)
 AND (coalesce(filters->>'customer','')='' OR p.customer_id=filters->>'customer')
 AND (coalesce(filters->>'status','ALL')='ALL' OR p.status=filters->>'status')
 AND (coalesce(filters->>'method','ALL')='ALL' OR p.billing_type=filters->>'method')
 AND (coalesce(filters->>'project','ALL')='ALL' OR p.campaign=filters->>'project')
 AND (nullif(filters->>'from','') IS NULL OR (CASE filters->>'dateField' WHEN 'due_date' THEN due_date WHEN 'created_date' THEN created_date ELSE payment_date END) >= (filters->>'from')::date)
 AND (nullif(filters->>'to','') IS NULL OR (CASE filters->>'dateField' WHEN 'due_date' THEN due_date WHEN 'created_date' THEN created_date ELSE payment_date END) <= (filters->>'to')::date)
), donors AS (
 SELECT customer_id,max(donor_name) AS name,max(donor_email) AS email,count(*) AS payments,
 coalesce(sum(amount) FILTER(WHERE status IN ('RECEIVED','RECEIVED_IN_CASH')),0) AS received,
 max(payment_date) FILTER(WHERE status IN ('RECEIVED','RECEIVED_IN_CASH','CONFIRMED')) AS last_payment
 FROM filtered GROUP BY customer_id
), subs AS (
 SELECT s.*,d.donor_name,d.donor_email,coalesce(d.campaign,'Doação Geral') AS campaign FROM donation_subscriptions s JOIN donations d ON d.id=s.donation_id
 WHERE s.environment=env AND (coalesce(filters->>'search','')='' OR position(lower(filters->>'search') in lower(d.donor_name || ' ' || d.donor_email))>0)
 AND (coalesce(filters->>'project','ALL')='ALL' OR coalesce(d.campaign,'Doação Geral')=filters->>'project')
)
SELECT jsonb_build_object(
 'environment',env,
 'payments',coalesce((SELECT jsonb_agg(x) FROM (SELECT * FROM filtered ORDER BY created_date DESC NULLS LAST,payment_id LIMIT (CASE WHEN filters->>'export'='true' THEN 20000 ELSE 50 END) OFFSET greatest(0,coalesce((filters->>'page')::int,0))*50) x),'[]'),
 'total',(SELECT count(*) FROM filtered),
 'totals',(SELECT jsonb_build_object(
  'received',coalesce(sum(amount) FILTER(WHERE status='RECEIVED'),0),
  'net',coalesce(sum(net_amount) FILTER(WHERE status='RECEIVED'),0),
  'fees',coalesce(sum(amount-net_amount) FILTER(WHERE status='RECEIVED' AND net_amount IS NOT NULL),0),
  'unknownNet',count(*) FILTER(WHERE status='RECEIVED' AND net_amount IS NULL),
  'confirmed',coalesce(sum(amount) FILTER(WHERE status='CONFIRMED'),0),
  'pending',coalesce(sum(amount) FILTER(WHERE status='PENDING'),0),
  'overdue',coalesce(sum(amount) FILTER(WHERE status='OVERDUE'),0),
  'cash',coalesce(sum(amount) FILTER(WHERE status='RECEIVED_IN_CASH'),0),
  'refunded',coalesce(sum(refunded_amount),0),
  'review',count(*) FILTER(WHERE status NOT IN ('RECEIVED','CONFIRMED','PENDING','OVERDUE','REFUNDED','DELETED','RECEIVED_IN_CASH'))
 ) FROM filtered),
 'donors',coalesce((SELECT jsonb_agg(x) FROM (SELECT * FROM donors ORDER BY received DESC,customer_id LIMIT 50 OFFSET greatest(0,coalesce((filters->>'page')::int,0))*50) x),'[]'),
 'donorCount',(SELECT count(*) FROM donors),
 'subscriptions',coalesce((SELECT jsonb_agg(x) FROM (SELECT * FROM subs ORDER BY next_due_date NULLS LAST,subscription_id LIMIT 50 OFFSET greatest(0,coalesce((filters->>'page')::int,0))*50) x),'[]'),
 'subscriptionCount',(SELECT count(*) FROM subs),
 'projects',coalesce((SELECT jsonb_agg(campaign ORDER BY campaign) FROM (SELECT DISTINCT coalesce(campaign,'Doação Geral') AS campaign FROM donations) x),'[]'),
 'syncIssues',coalesce((SELECT jsonb_agg(x) FROM (SELECT donation_id AS id,message FROM donation_sync_issues WHERE environment=env ORDER BY updated_at DESC LIMIT 100) x),'[]'),
 'syncIssueCount',(SELECT count(*) FROM donation_sync_issues WHERE environment=env),
 'lastSync',(SELECT to_jsonb(r) FROM donation_sync_runs r WHERE environment=env ORDER BY started_at DESC LIMIT 1),
 'unmatchedEvents',(SELECT count(*) FROM donation_webhook_events WHERE environment=env AND outcome='UNMATCHED'),
 'lastWebhook',(SELECT max(processed_at) FROM donation_webhook_events WHERE environment=env),
 'unmapped',(SELECT count(*) FROM donations d WHERE d.asaas_id IS NOT NULL AND NOT EXISTS(SELECT 1 FROM donation_payments p WHERE p.donation_id=d.id AND p.environment=env) AND NOT EXISTS(SELECT 1 FROM donation_subscriptions s WHERE s.donation_id=d.id AND s.environment=env))
);
$$;
REVOKE ALL ON FUNCTION public.donation_dashboard(text,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.donation_dashboard(text,jsonb) TO service_role;

CREATE FUNCTION public.donation_public_total(project uuid DEFAULT NULL) RETURNS numeric
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
 SELECT coalesce(sum(p.amount),0) FROM donation_payments p JOIN donations d ON d.id=p.donation_id
 WHERE p.environment='production' AND p.status IN ('CONFIRMED','RECEIVED','RECEIVED_IN_CASH')
 AND (project IS NULL OR d.project_id=project);
$$;
REVOKE ALL ON FUNCTION public.donation_public_total(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.donation_public_total(uuid) TO service_role;

CREATE FUNCTION public.record_donation_subscription(snapshot jsonb) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE s public.donation_subscriptions; BEGIN
 s := jsonb_populate_record(NULL::public.donation_subscriptions, snapshot);
 INSERT INTO public.donation_subscriptions SELECT s.*
 ON CONFLICT(environment,subscription_id) DO UPDATE SET
 status=EXCLUDED.status, amount=EXCLUDED.amount, next_due_date=EXCLUDED.next_due_date, observed_at=EXCLUDED.observed_at
 WHERE donation_subscriptions.observed_at <= EXCLUDED.observed_at;
END $$;
REVOKE ALL ON FUNCTION public.record_donation_subscription(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_donation_subscription(jsonb) TO service_role;
COMMIT;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
INSERT INTO public.system_settings(key, value)
VALUES ('REMINDERS_CRON_SECRET', encode(extensions.gen_random_bytes(32), 'hex'))
ON CONFLICT (key) DO NOTHING;
SELECT cron.alter_job(
  job_id := (SELECT jobid FROM cron.job WHERE jobname = 'donations-send-reminders-daily'),
  command := $cmd$
  SELECT net.http_post(
    url := 'https://institutoipag.lovable.app/api/public/donations/send-reminders',
    headers := jsonb_build_object('Content-Type','application/json','x-cron-secret',(SELECT value FROM public.system_settings WHERE key='REMINDERS_CRON_SECRET')),
    body := '{}'::jsonb
  ) AS request_id;
$cmd$
);
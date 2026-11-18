// Server-only: shared secret between the daily scheduler and the reminders route.
// Prefers the REMINDERS_CRON_SECRET env var; otherwise uses the value generated
// inside the database (system_settings is locked to the server role).
export async function getRemindersCronSecret(): Promise<string | null> {
  const fromEnv = process.env.REMINDERS_CRON_SECRET;
  if (fromEnv) return fromEnv;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("system_settings")
    .select("value")
    .eq("key", "REMINDERS_CRON_SECRET")
    .maybeSingle();
  return data?.value && data.value.length >= 32 ? data.value : null;
}

import { supabase } from "@/integrations/supabase/client";

export async function getAdminUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data: access, error: accessError } = await supabase
    .from("site_access")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (accessError || !access?.active || (!access.is_admin && !access.areas.length)) return null;
  return {
    ...access,
    id: user.id,
    email: user.email ?? "",
    name: access.name,
  };
}

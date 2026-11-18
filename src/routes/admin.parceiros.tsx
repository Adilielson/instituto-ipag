import { createFileRoute } from "@tanstack/react-router";
import { AdminInstitutional } from "@/components/institutional/AdminInstitutional";
export const Route = createFileRoute("/admin/parceiros")({
  component: () => <AdminInstitutional kind="partners" />,
});

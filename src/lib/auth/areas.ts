export const AREAS = [
  { id: "projetos", label: "Projetos" },
  { id: "eventos", label: "Eventos" },
  { id: "blog", label: "Blog" },
  { id: "doacoes", label: "Doações" },
  { id: "emails", label: "E-mails" },
  { id: "integracoes", label: "Integrações" },
  { id: "parceiros", label: "Parceiros" },
  { id: "transparencia", label: "Transparência" },
] as const;
export type Access = {
  user_id: string;
  name: string;
  is_admin: boolean;
  active: boolean;
  areas: string[];
};
export function canVisit(access: Access, path: string) {
  if (!access.active) return false;
  const area = path.replace(/\/$/, "").split("/")[2];
  return access.is_admin || (area ? access.areas.includes(area) : false);
}
export function firstArea(access: Access) {
  return access.is_admin
    ? "/admin"
    : `/admin/${AREAS.find((a) => access.areas.includes(a.id))?.id || ""}`;
}

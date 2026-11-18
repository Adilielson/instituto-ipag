export function hasAdminRole(roles: { role: string }[] | null | undefined) {
  return roles?.some(({ role }) => role === "admin") ?? false;
}

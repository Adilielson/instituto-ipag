export const ADMIN_MASTER = {
  email: "adilielson@gmail.com",
  role: "admin_master" as const,
  name: "Administrador Master",
};

export type AdminUser = typeof ADMIN_MASTER;

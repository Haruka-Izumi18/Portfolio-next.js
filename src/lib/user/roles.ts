export const AVAILABLE_ROLES = ["user", "admin"] as const;
export type UserRole = (typeof AVAILABLE_ROLES)[number];
export type Role = "Owner" | "Admin" | "Karyawan";

export interface Permission {
  id: string;
  name: string;
  description: string;
  code: PermissionCode;
  guard_name: string;
  status: "Aktif" | "Tidak Aktif";
}

export type PermissionCode =
  // User Management
  | "mengelola users"
  // Role Management
  | "mengelola roles"
  // Permission Management
  | "mengelola permissions"
  // Employee Management
  | "mengelola karyawan"
  // Attendance Management
  | "mengelola absensi"
  | "melakukan absensi"
  // Salary Management
  | "mengelola gaji"
  | "melihat gaji"
  // Leave Management
  | "mengelola cuti"
  | "melakukan cuti"
  // Report Management
  | "mencetak laporan";

export interface RolePermission {
  roleId: string;
  permissions: PermissionCode[];
}

export interface UserRole {
  userId: string;
  roles: Role[];
}

// Role permissions mapping based on backend seeder
export const ROLE_PERMISSIONS: Record<Role, PermissionCode[]> = {
  Owner: [
    "mengelola users",
    "mengelola gaji",
    "mengelola cuti",
    "mengelola absensi",
    "mencetak laporan",
  ],
  Admin: [
    "mengelola users",
    "mengelola roles",
    "mengelola permissions",
    "mengelola karyawan",
    "mengelola absensi",
    "mengelola gaji",
    "mengelola cuti",
    "mencetak laporan",
  ],
  Karyawan: [
    "melakukan absensi",
    "melihat gaji",
    "melakukan cuti",
  ],
};

// Helper function to check if a role has a specific permission
export function hasPermission(role: Role, permission: PermissionCode): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

// Helper function to get all permissions for a role
export function getRolePermissions(role: Role): PermissionCode[] {
  return ROLE_PERMISSIONS[role];
}
import { Role } from './role';

export interface User {
  id: number;
  name: string;
  email: string;
  status: 'Aktif' | 'Tidak Aktif';
  email_verified_at: string | null;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface UserWithRoles extends User {
  roles: Role[];
  permissions: string[];
}

// Form data untuk create/update user
export interface UserFormData {
  name: string;
  email: string;
  password?: string; // Optional untuk update
  status: 'Aktif' | 'Tidak Aktif';
  roles: Role[];
}

// API response untuk list users
export interface UserListResponse {
  data: UserWithRoles[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// API response untuk single user
export interface UserResponse {
  data: UserWithRoles;
  message: string;
}

// Login request/response
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserWithRoles;
  token: string;
  message: string;
}

// Register request
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Status user enum untuk type safety
export type StatusUser = 'Aktif' | 'Tidak Aktif';

// Helper function untuk format nama
export function formatNama(nama: string): string {
  return nama
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Helper function untuk check jika user adalah owner
export function isOwner(user: UserWithRoles): boolean {
  return user.roles.includes('Owner');
}

// Helper function untuk check jika user adalah admin
export function isAdmin(user: UserWithRoles): boolean {
  return user.roles.includes('Admin');
}

// Helper function untuk check jika user adalah karyawan
export function isKaryawan(user: UserWithRoles): boolean {
  return user.roles.includes('Karyawan');
}

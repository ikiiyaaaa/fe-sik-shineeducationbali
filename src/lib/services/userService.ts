import { apiRequest } from '../api';
import { UserListResponse, UserWithRoles } from '../../types/user';

export const userService = {
  // Mengambil semua users
  async getAllUsers(): Promise<UserListResponse> {
    return apiRequest<UserListResponse>('GET', '/api/users');
  },

  // Mengambil user berdasarkan ID
  async getUserById(id: number): Promise<UserWithRoles> {
    return apiRequest<UserWithRoles>('GET', `/api/users/${id}`);
  },

  // Membuat user baru
  async createUser(userData: any): Promise<UserWithRoles> {
    return apiRequest<UserWithRoles>('POST', '/api/users', userData);
  },

  // Update user
  async updateUser(id: number, userData: any): Promise<UserWithRoles> {
    return apiRequest<UserWithRoles>('PUT', `/api/users/${id}`, userData);
  },

  // Hapus user
  async deleteUser(id: number): Promise<void> {
    return apiRequest<void>('DELETE', `/api/users/${id}`);
  }
};

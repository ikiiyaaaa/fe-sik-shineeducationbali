import { PermissionCode } from '@/types/role';
import { apiRequest } from '@/lib/api';

export interface Role {
  id: string;
  name: string;
  status: string;
  userCount: number;
  permissionCount: number;
  createdAt: string;
  isSystemRole: boolean;
  permissions: PermissionCode[];
}

export interface CreateRoleData {
  name: string;
  status: string;
  permissions: PermissionCode[];
}

export interface UpdateRoleData {
  name?: string;
  status?: string;
  permissions?: PermissionCode[];
}

export interface RoleResponse {
  data: Role;
  message: string;
}

export interface RoleListResponse {
  data: Role[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

class RoleService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Get token from localStorage or cookies
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_token') 
      : null;

    console.log('RoleService request:', {
      endpoint,
      method: options.method || 'GET',
      token: token ? 'present' : 'missing',
      body: options.body
    });

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    return apiRequest<T>(
      options.method || 'GET',
      `/api${endpoint}`,
      options.body ? JSON.parse(options.body as string) : undefined,
      {
        ...options,
        headers,
        credentials: 'include',
        mode: 'cors',
      }
    );
  }

  // Get all roles
  async getRoles(): Promise<RoleListResponse> {
    console.log('RoleService: Fetching roles from /roles endpoint');
    return this.request<RoleListResponse>('/roles');
  }

  // Get single role by ID
  async getRole(id: string): Promise<RoleResponse> {
    return this.request<RoleResponse>(`/roles/${id}`);
  }

  // Create new role
  async createRole(data: CreateRoleData): Promise<RoleResponse> {
    console.log('RoleService: Creating role with data:', data);
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    console.log('RoleService: Current token:', token ? 'present' : 'missing');
    
    try {
      const result = await this.request<RoleResponse>('/roles', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      console.log('RoleService: Create role result:', result);
      return result;
    } catch (error) {
      console.error('RoleService: Create role error:', error);
      throw error;
    }
  }

  // Update role
  async updateRole(id: string, data: UpdateRoleData): Promise<RoleResponse> {
    return this.request<RoleResponse>(`/roles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete role
  async deleteRole(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/roles/${id}`, {
      method: 'DELETE',
    });
  }

  // Update role permissions
  async updateRolePermissions(
    id: string, 
    permissions: PermissionCode[]
  ): Promise<RoleResponse> {
    return this.request<RoleResponse>(`/roles/${id}/permissions`, {
      method: 'PATCH',
      body: JSON.stringify({ permissions }),
    });
  }

  // Get role users
  async getRoleUsers(id: string): Promise<{
    data: Array<{
      id: string;
      name: string;
      email: string;
    }>;
  }> {
    return this.request<{
      data: Array<{
        id: string;
        name: string;
        email: string;
      }>;
    }>(`/roles/${id}/users`);
  }

  // Test backend connectivity
  async testBackend(): Promise<{ status: string; message: string }> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      console.log('Testing backend connectivity to:', baseUrl);
      
      const response = await fetch(`${baseUrl}/api/roles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        mode: 'cors',
      });
      
      console.log('Backend test response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url
      });
      
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        return {
          status: 'redirect',
          message: `Backend mengembalikan redirect ke: ${location}. Endpoint /api/roles mungkin tidak tersedia.`
        };
      }
      
      if (response.ok) {
        return {
          status: 'success',
          message: 'Backend dapat diakses dengan baik.'
        };
      }
      
      return {
        status: 'error',
        message: `Backend error: ${response.status} ${response.statusText}`
      };
    } catch (error) {
      console.error('Backend test error:', error);
      return {
        status: 'error',
        message: `Tidak dapat mengakses backend: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

export const roleService = new RoleService();


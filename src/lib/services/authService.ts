import { apiRequest } from '@/lib/api';
import { LoginRequest, LoginResponse } from '@/types/user';

class AuthService {
  // Login user
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    console.log('AuthService: Attempting login with:', credentials);
    const result = await apiRequest<LoginResponse>('POST', '/api/login', credentials);
    console.log('AuthService: Login result:', result);
    return result;
  }

  // Logout user
  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  }

  // Get stored token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  // Store token after successful login
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }
}

export const authService = new AuthService();

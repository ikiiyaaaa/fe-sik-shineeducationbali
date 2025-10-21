'use client';

import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/lib/services/authService';
import { LoginRequest, UserWithRoles } from '@/types/user';

interface UseAuthReturn {
  user: UserWithRoles | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  autoLogin: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<UserWithRoles | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      console.log('Checking auth status:', authenticated);
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      // Store token and user data
      authService.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const autoLogin = useCallback(async () => {
    // Default credentials for auto login
    const defaultCredentials: LoginRequest = {
      email: 'admin@example.com', // Ganti dengan email yang valid
      password: 'password' // Ganti dengan password yang valid
    };

    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Attempting auto login with credentials:', defaultCredentials);
      const response = await authService.login(defaultCredentials);
      console.log('Auto login successful:', response);
      
      // Store token and user data
      authService.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      console.log('Token stored and user authenticated');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Auto login failed';
      setError(errorMessage);
      console.error('Auto login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    autoLogin,
  };
}

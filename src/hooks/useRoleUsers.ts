'use client';

import { useState, useCallback } from 'react';
import { roleService } from '@/lib/services/roleService';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UseRoleUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: (roleId: string) => Promise<void>;
}

export function useRoleUsers(): UseRoleUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (roleId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await roleService.getRoleUsers(roleId);
      setUsers(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch role users');
      console.error('Error fetching role users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}


'use client';

import { useState, useEffect, useCallback } from 'react';
import { roleService, Role, CreateRoleData, UpdateRoleData } from '@/lib/services/roleService';
import { PermissionCode } from '@/types/role';

interface UseRolesReturn {
  roles: Role[];
  loading: boolean;
  error: string | null;
  createRole: (data: CreateRoleData) => Promise<void>;
  updateRole: (id: string, data: UpdateRoleData) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  updateRolePermissions: (id: string, permissions: PermissionCode[]) => Promise<void>;
  refreshRoles: () => Promise<void>;
}

export function useRoles(): UseRolesReturn {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await roleService.getRoles();
      setRoles(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch roles');
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRole = useCallback(async (data: CreateRoleData) => {
    try {
      setError(null);
      console.log('useRoles: Creating role with data:', data);
      const response = await roleService.createRole(data);
      console.log('useRoles: Create role response:', response);
      setRoles(prev => [...prev, response.data]);
    } catch (err) {
      console.error('useRoles: Create role error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create role');
      throw err;
    }
  }, []);

  const updateRole = useCallback(async (id: string, data: UpdateRoleData) => {
    try {
      setError(null);
      const response = await roleService.updateRole(id, data);
      setRoles(prev => prev.map(role => 
        role.id === id ? response.data : role
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
      throw err;
    }
  }, []);

  const deleteRole = useCallback(async (id: string) => {
    try {
      setError(null);
      await roleService.deleteRole(id);
      setRoles(prev => prev.filter(role => role.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete role');
      throw err;
    }
  }, []);

  const updateRolePermissions = useCallback(async (id: string, permissions: PermissionCode[]) => {
    try {
      setError(null);
      const response = await roleService.updateRolePermissions(id, permissions);
      setRoles(prev => prev.map(role => 
        role.id === id ? response.data : role
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role permissions');
      throw err;
    }
  }, []);

  const refreshRoles = useCallback(async () => {
    await fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    loading,
    error,
    createRole,
    updateRole,
    deleteRole,
    updateRolePermissions,
    refreshRoles,
  };
}


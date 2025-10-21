'use client';

import { useState, useEffect } from 'react';
import RoleList from '@/components/ui-admin/role/RoleList';
import RoleDetail from '@/components/ui-admin/role/RoleDetail';
import RoleForm from '@/components/ui-admin/role/RoleForm';
import DeleteConfirmModal from '@/components/ui-admin/role/DeleteConfirmModal';
import { useRoles } from '@/hooks/useRoles';
import { useRoleUsers } from '@/hooks/useRoleUsers';
import { useAuth } from '@/hooks/useAuth';
import { PermissionCode } from '@/types/role';

type ViewMode = 'list' | 'detail' | 'create' | 'edit';

export default function RolePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; roleName: string }>({
    isOpen: false,
    roleName: ''
  });

  // Use auth hook for authentication
  const { 
    isAuthenticated, 
    isLoading: authLoading, 
    error: authError, 
    autoLogin 
  } = useAuth();

  // Use custom hooks for API integration
  const { 
    roles, 
    loading: rolesLoading, 
    error: rolesError, 
    createRole, 
    updateRole, 
    deleteRole, 
    updateRolePermissions 
  } = useRoles();

  const { 
    users: roleUsers, 
    fetchUsers 
  } = useRoleUsers();

  const selectedRole = selectedRoleId ? roles.find(r => r.id === selectedRoleId) : null;

  // Auto login on component mount
  useEffect(() => {
    const performAutoLogin = async () => {
      console.log('Auto login effect triggered:', { isAuthenticated, authLoading });
      if (!isAuthenticated && !authLoading) {
        console.log('Starting auto login...');
        try {
          await autoLogin();
          console.log('Auto login completed successfully');
        } catch (error) {
          console.error('Auto login failed:', error);
        }
      }
    };

    // Add a small delay to ensure auth state is properly initialized
    const timer = setTimeout(performAutoLogin, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, authLoading, autoLogin]);

  // Fetch users when viewing role detail
  useEffect(() => {
    if (viewMode === 'detail' && selectedRoleId && isAuthenticated) {
      fetchUsers(selectedRoleId);
    }
  }, [viewMode, selectedRoleId, fetchUsers, isAuthenticated]);

  const handleView = (roleId: string) => {
    setSelectedRoleId(roleId);
    setViewMode('detail');
  };

  const handleEdit = (roleId: string) => {
    setSelectedRoleId(roleId);
    setViewMode('edit');
  };

  const handleDelete = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role) {
      setSelectedRoleId(roleId);
      setDeleteModal({ isOpen: true, roleName: role.name });
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedRoleId) {
      try {
        await deleteRole(selectedRoleId);
        setDeleteModal({ isOpen: false, roleName: '' });
        setSelectedRoleId(null);
      } catch (error) {
        console.error('Failed to delete role:', error);
        // Error is handled by the hook
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, roleName: '' });
  };

  const handleCreateNew = () => {
    setSelectedRoleId(null);
    setViewMode('create');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedRoleId(null);
  };

  const handleSaveRole = async (data: { name: string; status: string; permissions: PermissionCode[] }) => {
    try {
      console.log('handleSaveRole: Starting save with data:', data);
      console.log('handleSaveRole: Current auth status:', { isAuthenticated, authLoading });
      console.log('handleSaveRole: Current token:', localStorage.getItem('auth_token'));
      
      // Check if user is authenticated before proceeding
      if (!isAuthenticated) {
        console.log('handleSaveRole: User not authenticated, attempting auto login...');
        try {
          await autoLogin();
          console.log('handleSaveRole: Auto login successful, proceeding with save');
        } catch (loginError) {
          console.error('handleSaveRole: Auto login failed:', loginError);
          throw new Error('Authentication required. Please try again.');
        }
      }
      
      if (viewMode === 'create') {
        console.log('handleSaveRole: Creating new role');
        await createRole(data);
      } else if (viewMode === 'edit' && selectedRoleId) {
        console.log('handleSaveRole: Updating role:', selectedRoleId);
        await updateRole(selectedRoleId, data);
      }
      setViewMode('list');
      setSelectedRoleId(null);
    } catch (error) {
      console.error('Failed to save role:', error);
      // Error is handled by the hook
    }
  };

  const handleSavePermissions = async (permissions: PermissionCode[]) => {
    if (selectedRoleId) {
      try {
        await updateRolePermissions(selectedRoleId, permissions);
      } catch (error) {
        console.error('Failed to save permissions:', error);
        // Error is handled by the hook
      }
    }
  };


  // Show loading state during auto login
  if (authLoading || (!isAuthenticated && !authError)) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Sedang melakukan auto login...</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Status: {authLoading ? 'Loading...' : 'Not authenticated'}</p>
              <p>Error: {authError || 'None'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if auto login fails
  if (authError) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">Gagal melakukan auto login</p>
              <p className="text-sm">{authError}</p>
            </div>
            <button
              onClick={() => autoLogin()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {viewMode === 'list' && (
        <RoleList
          roles={roles}
          loading={rolesLoading}
          error={rolesError}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateNew={handleCreateNew}
        />
      )}
      
      {viewMode === 'detail' && selectedRole && (
        <RoleDetail
          role={selectedRole}
          users={roleUsers}
          onBack={handleBackToList}
          onSave={handleSavePermissions}
        />
      )}
      
      {(viewMode === 'create' || viewMode === 'edit') && (
        <RoleForm
          role={viewMode === 'edit' && selectedRole ? {
            id: selectedRole.id,
            name: selectedRole.name,
            status: selectedRole.status,
            permissions: selectedRole.permissions
          } : undefined}
          onSave={handleSaveRole}
          onCancel={handleBackToList}
          loading={rolesLoading}
          error={rolesError}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        roleName={deleteModal.roleName}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

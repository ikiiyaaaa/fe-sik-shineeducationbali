'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeftIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  CheckIcon,
  XMarkIcon,
  UserIcon,
  KeyIcon
} from '@heroicons/react/24/solid';
import { PermissionCode, ROLE_PERMISSIONS } from '@/types/role';

interface RoleDetailProps {
  role: {
    id: string;
    name: string;
    createdAt: string;
    isSystemRole: boolean;
    userCount: number;
    permissionCount: number;
  };
  users: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  onBack: () => void;
  onSave: (permissions: PermissionCode[]) => void;
}

const ALL_PERMISSIONS: PermissionCode[] = [
  'mengelola users',
  'mengelola roles',
  'mengelola permissions',
  'mengelola karyawan',
  'mengelola absensi',
  'melakukan absensi',
  'mengelola gaji',
  'melihat gaji',
  'mengelola cuti',
  'melakukan cuti',
  'mencetak laporan'
];

export default function RoleDetail({ role, users, onBack, onSave }: RoleDetailProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionCode[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Initialize with current role permissions
    const currentPermissions = ROLE_PERMISSIONS[role.name as keyof typeof ROLE_PERMISSIONS] || [];
    setSelectedPermissions(currentPermissions);
  }, [role.name]);

  const handlePermissionToggle = (permission: PermissionCode) => {
    const newPermissions = selectedPermissions.includes(permission)
      ? selectedPermissions.filter(p => p !== permission)
      : [...selectedPermissions, permission];
    
    setSelectedPermissions(newPermissions);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(selectedPermissions);
    setHasChanges(false);
  };

  const displayUsers = users.slice(0, 5);
  const remainingUsers = users.length - 5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{role.name}</h1>
            <p className="text-gray-600">Detail role dan pengaturan permission</p>
          </div>
        </div>
        {hasChanges && !role.isSystemRole && (
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-[#c40001] text-white rounded-lg hover:bg-[#c40001]/90 transition-colors"
          >
            <CheckIcon className="w-5 h-5 mr-2" />
            Simpan Perubahan
          </button>
        )}
      </div>

      {/* Role Info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="p-3 bg-[#c40001]/10 rounded-lg mr-4">
              <UserGroupIcon className="w-6 h-6 text-[#c40001]" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Pengguna</div>
              <div className="text-2xl font-bold text-gray-900">{role.userCount}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-3 bg-[#dda822]/10 rounded-lg mr-4">
              <KeyIcon className="w-6 h-6 text-[#dda822]" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Permission</div>
              <div className="text-2xl font-bold text-gray-900">{role.permissionCount}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-3 bg-gray-100 rounded-lg mr-4">
              <CalendarDaysIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Tanggal Dibuat</div>
              <div className="text-sm font-medium text-gray-900">
                {new Date(role.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {role.isSystemRole && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">
                System Role - Tidak dapat diubah
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pengguna dengan Role Ini</h3>
        {users.length > 0 ? (
          <div className="space-y-3">
            {displayUsers.map((user) => (
              <div key={user.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-[#c40001]/10 rounded-lg mr-3">
                  <UserIcon className="w-5 h-5 text-[#c40001]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
            ))}
            {remainingUsers > 0 && (
              <div className="text-center py-2">
                <span className="text-sm text-gray-500">
                  dan {remainingUsers} pengguna lainnya
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Belum ada pengguna dengan role ini</p>
          </div>
        )}
      </div>

      {/* Permissions Management */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Permission Management</h3>
          {role.isSystemRole && (
            <span className="text-sm text-gray-500">Read-only mode</span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_PERMISSIONS.map((permission) => {
            const isSelected = selectedPermissions.includes(permission);
            const isDisabled = role.isSystemRole;
            
            return (
              <label
                key={permission}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-[#c40001] bg-[#c40001]/5'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handlePermissionToggle(permission)}
                  disabled={isDisabled}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${
                  isSelected
                    ? 'border-[#c40001] bg-[#c40001]'
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  isSelected ? 'text-[#c40001]' : 'text-gray-700'
                }`}>
                  {permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </label>
            );
          })}
        </div>

        {role.isSystemRole && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <XMarkIcon className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">
                System role tidak dapat diubah. Permission hanya dapat dilihat.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

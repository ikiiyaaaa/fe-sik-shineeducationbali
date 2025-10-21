'use client';

import { useState, useEffect } from 'react';
import { 
  XMarkIcon,
  CheckIcon,
  KeyIcon
} from '@heroicons/react/24/solid';
import { PermissionCode } from '@/types/role';

interface RoleFormProps {
  role?: {
    id: string;
    name: string;
    status?: string;
    permissions: PermissionCode[];
  };
  onSave: (data: { name: string; status: string; permissions: PermissionCode[] }) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string | null;
}

// const ALL_PERMISSIONS: PermissionCode[] = [
//   'mengelola users',
//   'mengelola roles',
//   'mengelola permissions',
//   'mengelola karyawan',
//   'mengelola absensi',
//   'melakukan absensi',
//   'mengelola gaji',
//   'melihat gaji',
//   'mengelola cuti',
//   'melakukan cuti',
//   'mencetak laporan'
// ];

const PERMISSION_GROUPS: Record<string, PermissionCode[]> = {
  'User Management': ['mengelola users', 'mengelola roles', 'mengelola permissions'],
  'Employee Management': ['mengelola karyawan'],
  'Attendance Management': ['mengelola absensi', 'melakukan absensi'],
  'Salary Management': ['mengelola gaji', 'melihat gaji'],
  'Leave Management': ['mengelola cuti', 'melakukan cuti'],
  'Report Management': ['mencetak laporan']
};

export default function RoleForm({ role, onSave, onCancel, loading = false, error }: RoleFormProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Aktif');
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionCode[]>([]);
  const [errors, setErrors] = useState<{ name?: string; status?: string }>({});

  useEffect(() => {
    if (role) {
      setName(role.name);
      setStatus(role.status || 'Aktif');
      setSelectedPermissions(role.permissions);
    }
  }, [role]);

  const handlePermissionToggle = (permission: PermissionCode) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleGroupToggle = (groupPermissions: PermissionCode[]) => {
    const allSelected = groupPermissions.every(p => selectedPermissions.includes(p));
    
    if (allSelected) {
      // Unselect all permissions in this group
      setSelectedPermissions(prev => 
        prev.filter(p => !groupPermissions.includes(p))
      );
    } else {
      // Select all permissions in this group
      setSelectedPermissions(prev => {
        const newPermissions = [...prev];
        groupPermissions.forEach(p => {
          if (!newPermissions.includes(p)) {
            newPermissions.push(p);
          }
        });
        return newPermissions;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { name?: string; status?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Nama role harus diisi';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nama role minimal 3 karakter';
    }
    
    if (!status.trim()) {
      newErrors.status = 'Status role harus diisi';
    }
    
    if (selectedPermissions.length === 0) {
      newErrors.name = 'Pilih minimal satu permission';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSave({ name: name.trim(), status: status.trim(), permissions: selectedPermissions });
    }
  };

  const isGroupSelected = (groupPermissions: PermissionCode[]) => {
    return groupPermissions.every(p => selectedPermissions.includes(p));
  };

  const isGroupPartiallySelected = (groupPermissions: PermissionCode[]) => {
    return groupPermissions.some(p => selectedPermissions.includes(p)) && 
           !groupPermissions.every(p => selectedPermissions.includes(p));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {role ? 'Edit Role' : 'Buat Role Baru'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border-l-4 border-red-400">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Role Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Role
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama role"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c40001] focus:border-transparent ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Role Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Role
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c40001] focus:border-transparent ${
                errors.status ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          {/* Permission Groups */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Permission
            </label>
            
            <div className="space-y-6">
              {Object.entries(PERMISSION_GROUPS).map(([groupName, groupPermissions]) => (
                <div key={groupName} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">{groupName}</h4>
                    <button
                      type="button"
                      onClick={() => handleGroupToggle(groupPermissions)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        isGroupSelected(groupPermissions)
                          ? 'bg-[#c40001] text-white'
                          : isGroupPartiallySelected(groupPermissions)
                          ? 'bg-[#dda822] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isGroupSelected(groupPermissions) ? 'Semua' : 
                       isGroupPartiallySelected(groupPermissions) ? 'Sebagian' : 'Pilih Semua'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {groupPermissions.map((permission) => {
                      const isSelected = selectedPermissions.includes(permission);
                      
                      return (
                        <label
                          key={permission}
                          className="flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handlePermissionToggle(permission)}
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
                          <span className={`text-sm ${
                            isSelected ? 'text-[#c40001] font-medium' : 'text-gray-700'
                          }`}>
                            {permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <KeyIcon className="w-5 h-5 text-[#c40001] mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {selectedPermissions.length} permission dipilih
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                loading 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-[#c40001] text-white hover:bg-[#c40001]/90'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {role ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <CheckIcon className="w-5 h-5 mr-2" />
                  {role ? 'Update Role' : 'Buat Role'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

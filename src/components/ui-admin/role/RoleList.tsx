'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/solid';
interface RoleWithStats {
  id: string;
  name: string;
  status: string;
  userCount: number;
  permissionCount: number;
  createdAt: string;
  isSystemRole: boolean;
}

interface RoleListProps {
  roles: RoleWithStats[];
  loading?: boolean;
  error?: string | null;
  onView: (roleId: string) => void;
  onEdit: (roleId: string) => void;
  onDelete: (roleId: string) => void;
  onCreateNew: () => void;
}

export default function RoleList({ roles, loading = false, error = null, onView, onEdit, onDelete, onCreateNew }: RoleListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600">Kelola role dan permission sistem</p>
        </div>
        <button
          onClick={onCreateNew}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 bg-[#c40001] text-white rounded-lg hover:bg-[#c40001]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Buat Role Baru
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c40001] focus:border-transparent"
        />
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              {/* Role Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-[#c40001]/10 rounded-lg mr-3">
                    <UserGroupIcon className="w-6 h-6 text-[#c40001]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        role.status === 'Aktif' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {role.status}
                      </span>
                      {role.isSystemRole && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <ShieldCheckIcon className="w-3 h-3 mr-1" />
                          System Role
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#c40001]">{role.userCount}</div>
                  <div className="text-sm text-gray-600">Pengguna</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#dda822]">{role.permissionCount}</div>
                  <div className="text-sm text-gray-600">Permission</div>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <CalendarDaysIcon className="w-4 h-4 mr-2" />
                Dibuat: {new Date(role.createdAt).toLocaleDateString('id-ID')}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => onView(role.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Lihat
                </button>
                <button
                  onClick={() => onEdit(role.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-[#dda822] rounded-lg hover:bg-[#dda822]/90 transition-colors"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </button>
                {!role.isSystemRole && (
                  <button
                    onClick={() => onDelete(role.id)}
                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRoles.length === 0 && (
        <div className="text-center py-12">
          <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada role ditemukan</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Mulai dengan membuat role pertama'}
          </p>
          {!searchTerm && (
            <button
              onClick={onCreateNew}
              className="inline-flex items-center px-4 py-2 bg-[#c40001] text-white rounded-lg hover:bg-[#c40001]/90 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Buat Role Pertama
            </button>
          )}
        </div>
      )}
    </div>
  );
}

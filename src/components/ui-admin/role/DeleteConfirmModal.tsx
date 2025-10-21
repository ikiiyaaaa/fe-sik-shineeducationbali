'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  roleName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ 
  isOpen, 
  roleName, 
  onConfirm, 
  onCancel 
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Hapus Role
            </h3>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Apakah Anda yakin ingin menghapus role <strong>&quot;{roleName}&quot;</strong>?
            </p>
            <p className="text-sm text-red-600">
              Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi semua pengguna dengan role ini.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

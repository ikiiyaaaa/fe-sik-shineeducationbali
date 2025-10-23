'use client';

import { useUsers } from '../hooks/useUsers';

export default function Home() {
  const { users, loading, error } = useUsers();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="font-bold text-lg">Error Koneksi Backend</p>
            </div>
            <p className="text-sm mb-3">{error}</p>
            
            {error.includes('HasApiTokens') && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mt-3">
                <p className="font-semibold text-sm mb-2">Solusi untuk Backend:</p>
                <ol className="text-xs text-left space-y-1">
                  <li>1. Pastikan Laravel Sanctum sudah diinstall: <code className="bg-yellow-200 px-1 rounded">composer require laravel/sanctum</code></li>
                  <li>2. Tambahkan trait HasApiTokens ke model User:</li>
                  <li className="ml-4">• Buka file <code className="bg-yellow-200 px-1 rounded">app/Models/User.php</code></li>
                  <li className="ml-4">• Tambahkan <code className="bg-yellow-200 px-1 rounded">use Laravel\Sanctum\HasApiTokens;</code></li>
                  <li className="ml-4">• Tambahkan <code className="bg-yellow-200 px-1 rounded">use HasApiTokens;</code> di dalam class</li>
                  <li>3. Jalankan <code className="bg-yellow-200 px-1 rounded">php artisan migrate</code></li>
                  <li>4. Restart backend server</li>
                </ol>
              </div>
            )}
            
            {error.includes('CORS') && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mt-3">
                <p className="font-semibold text-sm mb-2">Solusi CORS:</p>
                <ol className="text-xs text-left space-y-1">
                  <li>1. Pastikan backend berjalan di port 8080</li>
                  <li>2. Periksa konfigurasi CORS di backend Laravel</li>
                  <li>3. Tambahkan middleware CORS jika belum ada</li>
                </ol>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Data Users</h1>
          <p className="mt-2 text-gray-600">Daftar semua users yang terdaftar dalam sistem</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <li className="px-6 py-4 text-center text-gray-500">
                Tidak ada data users
              </li>
            ) : (
              users.map((user) => (
                <li key={user.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'Aktif' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.roles && user.roles.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role, index) => (
                              <span 
                                key={index}
                                className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">Tidak ada role</span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {users.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Total: {users.length} users
          </div>
        )}
      </div>
    </div>
  );
}

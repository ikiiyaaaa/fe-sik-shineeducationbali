export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Test Page</h1>
          <p className="mt-2 text-gray-600">Halaman test untuk memastikan routing berfungsi</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 text-center text-gray-500">
            <p>Halaman Test berhasil dimuat!</p>
            <p className="mt-2">Route /test sudah berfungsi dengan baik.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function RoleLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      {/* Search Skeleton */}
      <div className="h-10 bg-gray-200 rounded w-80 animate-pulse"></div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 animate-pulse"></div>
                <div>
                  <div className="h-6 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="h-8 bg-gray-200 rounded w-8 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
              </div>
              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="h-8 bg-gray-200 rounded w-8 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
              </div>
            </div>

            <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>

            <div className="flex space-x-2">
              <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


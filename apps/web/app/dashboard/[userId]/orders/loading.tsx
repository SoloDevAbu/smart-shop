export default function OrdersLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="fixed left-0 top-0 w-full h-1">
        <div className="h-full bg-blue-600 animate-progress"></div>
      </div>
      
      <div className="pt-24 pb-12 px-4 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8"></div>

          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>

                <div className="border-t dark:border-gray-700 pt-4 mt-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
                  <div className="space-y-2">
                    {[...Array(2)].map((_, j) => (
                      <div key={j} className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 pt-4 mt-4 flex justify-between items-center">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
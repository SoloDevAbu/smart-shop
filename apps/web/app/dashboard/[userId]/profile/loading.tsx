export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="fixed left-0 top-0 w-full h-1">
        <div className="h-full bg-blue-600 animate-progress"></div>
      </div>
      
      <div className="pt-24 pb-12 px-4 ml-64">
        <div className="max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8"></div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>

              <div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>

              <div className="pt-4 border-t dark:border-gray-700">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t dark:border-gray-700">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Loading...</h2>
          <p className="text-sm text-gray-500">
            Please wait while we load your content
          </p>
        </div>
      </div>
    </div>
  );
}

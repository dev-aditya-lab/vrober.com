import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 0a4 4 0 000 8h6a4 4 0 000-8H9z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>

        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mb-6 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Go back home
          </Link>

          <Link
            href="/"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}

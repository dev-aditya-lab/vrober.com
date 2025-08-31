
export default function SearchBar() {
    return (
        <div className="relative w-full max-w-md mx-auto">
            <input
                type="search"
                placeholder="Luxury Services Delivered to Your Doorstep"
                className="w-full px-4 py-4 pl-10 text-gray-700 bg-white border-2 border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    )
}

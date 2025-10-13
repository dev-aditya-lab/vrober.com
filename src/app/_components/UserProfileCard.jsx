import Image from 'next/image';
import { FaCamera, FaStar } from 'react-icons/fa6';

export default function UserProfileCard() {
  return (
    <div className="relative z-20 mx-4 -mt-8 mb-6 rounded-2xl border border-gray-100 bg-white shadow-lg">
      <div className="p-6 text-center">
        {/* Profile Avatar */}
        <div className="relative mb-4">
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
            <Image
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sarah Johnson"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Camera Icon */}
          <button className="absolute right-1/2 bottom-0 flex h-8 w-8 translate-x-8 translate-y-2 items-center justify-center rounded-full bg-blue-500 shadow-lg transition-colors hover:bg-blue-600">
            <FaCamera className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* User Info */}
        <h2 className="mb-1 text-2xl font-bold text-gray-900">Sarah Johnson</h2>
        <p className="mb-3 text-sm text-gray-600">sarah.johnson@email.com</p>

        {/* Rating */}
        <div className="mb-6 flex items-center justify-center space-x-1">
          <FaStar className="h-4 w-4 text-yellow-400" />
          <span className="text-lg font-bold text-gray-900">4.9</span>
          <span className="text-sm text-gray-600">rating</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-around border-t border-gray-100 pt-4">
          <div className="text-center">
            <div className="mb-1 text-2xl font-bold text-blue-600">127</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-2xl font-bold text-green-600">4.9</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-2xl font-bold text-purple-600">2.3K</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
        </div>
      </div>
    </div>
  );
}

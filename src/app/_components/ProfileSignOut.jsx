import { FaRightFromBracket } from 'react-icons/fa6';

export default function ProfileSignOut() {
  return (
    <div className="mt-6 mb-4">
      <button className="group w-full rounded-2xl border border-red-200 bg-red-50 p-4 transition-all duration-200 hover:bg-red-100">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 transition-transform duration-200 group-hover:scale-110">
            <FaRightFromBracket className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-red-600 group-hover:text-red-700">
            Sign Out
          </span>
        </div>
      </button>
    </div>
  );
}

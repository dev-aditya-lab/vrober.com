import { FaCalendarCheck, FaHouse, FaMagnifyingGlass, FaUser } from 'react-icons/fa6'

export default function BottomNavigation() {
    const navItems = [
        {
            id: 'home',
            label: 'Home',
            icon: FaHouse,
            href: '/Home',
            active: false
        },
        {
            id: 'search',
            label: 'Search',
            icon: FaMagnifyingGlass,
            href: '/search',
            active: false
        },
        {
            id: 'bookings',
            label: 'Bookings',
            icon: FaCalendarCheck,
            href: '/bookings',
            active: true
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: FaUser,
            href: '/profile',
            active: false
        }
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
            <div className="flex items-center justify-around max-w-md mx-auto">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${item.active
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`text-xs font-medium ${item.active ? 'text-blue-600' : 'text-gray-500'}`}>
                            {item.label}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    )
}
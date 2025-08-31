import { FaCalendar, FaHouse, FaMagnifyingGlass, FaUser } from "react-icons/fa6";

import Link from 'next/link';

export default function MobileNav() {
  const navItem = [
    { name: 'Home', icon: <FaHouse className="h-5 w-5" />, link: '/' },
    { name: 'Search', icon: <FaMagnifyingGlass className="h-5 w-5" />, link: '/search' },
    { name: 'Bookings', icon: <FaCalendar className="h-5 w-5" />, link: '/bookings' },
    { name: 'Profile', icon: <FaUser className="h-5 w-5" />, link: '/profile' },
  ]
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-screen bg-white border-t border-gray-200 shadow-md flex justify-between md:hidden px-5 py-3">
        {
          navItem.map((item, i) => (
            <Link href={item.link} key={i}>
              <div className='mobile-nav-icon'>
                {item.icon}
                <span className="text-[0.8em]">{item.name}</span>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}

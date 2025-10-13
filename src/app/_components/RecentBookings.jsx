import { FaDumbbell, FaHandSparkles, FaSpa, FaStar } from 'react-icons/fa6';

export default function RecentBookings() {
  const recentBookings = [
    {
      id: 1,
      title: 'Deep Tissue Massage',
      location: 'Wellness Spa',
      date: 'Dec 15, 3:00 PM',
      price: '$120',
      status: 'Completed',
      statusColor: 'text-green-600',
      statusBg: 'bg-green-100',
      icon: FaSpa,
      iconBg: 'bg-orange-500',
      rating: 5.0,
      actionText: 'Book Again',
      actionColor: 'text-blue-600',
    },
    {
      id: 2,
      title: 'Manicure & Pedicure',
      location: 'Beauty Lounge',
      date: 'Dec 10, 11:00 AM',
      price: '$65',
      status: 'Completed',
      statusColor: 'text-green-600',
      statusBg: 'bg-green-100',
      icon: FaHandSparkles,
      iconBg: 'bg-pink-500',
      rating: 4.0,
      actionText: 'Book Again',
      actionColor: 'text-blue-600',
    },
    {
      id: 3,
      title: 'Personal Training',
      location: 'FitLife Gym',
      date: 'Dec 8, 6:00 AM',
      price: '$90',
      status: 'Cancelled',
      statusColor: 'text-red-600',
      statusBg: 'bg-red-100',
      icon: FaDumbbell,
      iconBg: 'bg-red-500',
      rating: null,
      actionText: 'Reschedule',
      actionColor: 'text-blue-600',
      refund: 'Refund: $90',
    },
  ];

  const renderStars = (rating) => {
    if (!rating) return null;

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {recentBookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start space-x-3">
              {/* Service Icon */}
              <div
                className={`h-12 w-12 ${booking.iconBg} flex flex-shrink-0 items-center justify-center rounded-xl`}
              >
                <booking.icon className="h-6 w-6 text-white" />
              </div>

              {/* Booking Details */}
              <div className="flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-base font-bold text-gray-900">
                      {booking.title}
                    </h3>
                    <p className="text-sm text-gray-600">{booking.location}</p>
                  </div>
                  <span
                    className={`px-3 py-1 ${booking.statusBg} ${booking.statusColor} rounded-full text-sm font-medium`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Date and Price */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{booking.date}</span>
                  <span className="text-lg font-bold text-gray-900">
                    {booking.price}
                  </span>
                </div>

                {/* Action and Rating */}
                <div className="flex items-center justify-between">
                  <button
                    className={`${booking.actionColor} text-sm font-medium hover:underline`}
                  >
                    {booking.actionText}
                  </button>
                  {renderStars(booking.rating)}
                </div>

                {/* Refund Info for Cancelled */}
                {booking.refund && (
                  <div className="mt-2 border-t border-gray-100 pt-2">
                    <span className="text-sm text-gray-500">
                      {booking.refund}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

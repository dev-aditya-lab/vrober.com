import Image from 'next/image';

export default function PremiumServices() {
    const premiumServices = [
        {
            id: 1,
            title: "Professional Deep Cleaning",
            desc: "Expert office and home deep cleaning with professional equipment",
            img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "₹999",
            originalPrice: "₹1,499",
            badge: "Premium",
            bottomText: "Includes carpet cleaning & sanitization",
            bgGradient: "from-orange-400 to-yellow-500"
        },
        {
            id: 2,
            title: "Luxury Home Spa Service",
            desc: "Premium spa treatment in the comfort of your home",
            img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "₹1,999",
            originalPrice: "₹2,999",
            badge: "Exclusive",
            bottomText: "2-hour session with certified therapist",
            bgGradient: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            title: "Premium AC Installation",
            desc: "Complete AC installation with 5-year warranty",
            img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "₹2,499",
            originalPrice: "₹3,999",
            badge: "Best Value",
            bottomText: "Free maintenance for 1st year",
            bgGradient: "from-blue-500 to-cyan-500"
        }
    ];

    return (
        <div className="my-9">
            <h2 className="Seaction-heading">Premium Services</h2>
            <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
                {premiumServices.map((service) => (
                    <div
                        key={service.id}
                        className="min-w-[280px] max-w-[280px] rounded-2xl bg-white shadow-lg overflow-hidden relative group hover:shadow-xl transition-all duration-300"
                    >
                        {/* Premium Badge */}
                        <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${service.bgGradient}`}>
                            {service.badge}
                        </div>

                        {/* Service Image */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={service.img}
                                alt={service.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 space-y-3">
                            {/* Title & Description */}
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-1">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {service.desc}
                                </p>
                            </div>

                            {/* Pricing */}
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-gray-800">
                                    {service.price}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                    {service.originalPrice}
                                </span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                                    Save {Math.round(((parseInt(service.originalPrice.replace('₹', '').replace(',', '')) - parseInt(service.price.replace('₹', '').replace(',', ''))) / parseInt(service.originalPrice.replace('₹', '').replace(',', ''))) * 100)}%
                                </span>
                            </div>

                            {/* Book Now Button */}
                            <button className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${service.bgGradient} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                                Book Now
                            </button>

                            {/* Bottom Text */}
                            <p className="text-xs text-gray-500 text-center italic border-t border-gray-100 pt-2">
                                {service.bottomText}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

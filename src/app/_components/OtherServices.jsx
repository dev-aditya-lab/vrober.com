import Image from 'next/image';

export default function OtherServices() {
    const otherServices = [
        {
            id: 1,
            title: "Men's Grooming",
            desc: "Haircut, beard trim & styling",
            img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            price: "$20",
            priceText: "onwards"
        },
        {
            id: 2,
            title: "Home Painting",
            desc: "Interior & exterior painting services",
            img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            price: "$80",
            priceText: "onwards"
        },
        {
            id: 3,
            title: "Pet Grooming",
            desc: "Professional pet care and grooming services",
            img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            price: "$80",
            priceText: "onwards"
        }
    ];

    return (
        <div className="my-9 px-4">
            <h2 className="Seaction-heading">Other Services</h2>
            <div className="grid grid-cols-1 gap-3">
                {otherServices.map((service) => (
                    <div
                        key={service.id}
                        className="group bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                    >
                        <div className="flex items-center space-x-3">
                            {/* Service Image - Smaller & Stylish */}
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                                    <Image
                                        src={service.img}
                                        alt={service.title}
                                        width={56}
                                        height={56}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </div>

                            {/* Service Content - Compact */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 truncate">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-1 mb-1">
                                    {service.desc}
                                </p>
                                <div className="flex items-center space-x-1">
                                    <span className="text-base font-bold text-blue-600">
                                        {service.price}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {service.priceText}
                                    </span>
                                </div>
                            </div>

                            {/* Compact Book Now Button */}
                            <div className="flex-shrink-0">
                                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-sm">
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
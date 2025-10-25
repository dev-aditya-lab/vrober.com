'use client';
import { getServicesByCategory } from '@/lib/servicesData';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaSearch, FaShareAlt, FaStar } from 'react-icons/fa';

export default function CategoryService() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id;

  const [categoryData, setCategoryData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load category data
    const data = getServicesByCategory(categoryId);
    setCategoryData(data);
    setLoading(false);
  }, [categoryId]);

  const handleBookService = (serviceId) => {
    // Navigate to booking page with pre-selected service
    router.push(`/book?serviceId=${categoryId}&subServiceId=${serviceId}`);
  };

  const handleBack = () => {
    router.back();
  };

  const filteredServices =
    categoryData?.services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (!categoryData || categoryData.services.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">
            No services found for this category
          </p>
          <button
            onClick={handleBack}
            className="mt-4 rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="rounded-full p-2 hover:bg-gray-100"
              aria-label="Go back"
            >
              <FaArrowLeft className="text-xl text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {categoryData.categoryName}
              </h1>
              {categoryData.description && (
                <p className="text-xs text-gray-500">
                  {categoryData.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-full p-2 hover:bg-gray-100"
              aria-label="Search"
            >
              <FaSearch className="text-xl text-gray-700" />
            </button>
            <button
              className="rounded-full p-2 hover:bg-gray-100"
              aria-label="Share"
            >
              <FaShareAlt className="text-xl text-gray-700" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="px-4 py-4">
        {filteredServices.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No services match your search</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={() => handleBookService(service.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Service Card Component
const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex gap-4 p-4">
        {/* Left Side - Service Info */}
        <div className="flex-1">
          {/* Service Name */}
          <h3 className="mb-1 text-base font-semibold text-gray-900">
            {service.name}
          </h3>

          {/* Rating */}
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <FaStar className="text-sm text-yellow-500" />
              <span className="text-sm font-medium text-gray-900">
                {service.rating}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({service.reviews} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="mb-2 text-sm text-gray-600">{service.description}</p>

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <ul className="mb-3 space-y-1">
              {service.tags.map((tag, index) => (
                <li
                  key={index}
                  className="flex items-start gap-1 text-xs text-gray-600"
                >
                  <span className="mt-1">•</span>
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Price and Duration */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{service.price}
            </span>
            <span className="text-xs text-gray-500">• {service.duration}</span>
            {service.discount && (
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                {service.discount}
              </span>
            )}
          </div>

          {/* View Details Link */}
          <button className="mt-2 text-sm font-medium text-purple-600 hover:text-purple-700">
            View details
          </button>
        </div>

        {/* Right Side - Image and Book Button */}
        <div className="flex w-32 flex-col items-center justify-between">
          {/* Badge */}
          {service.badge && (
            <div className="mb-2 rounded bg-gray-900 px-2 py-1 text-[10px] font-medium text-white">
              {service.badge}
            </div>
          )}

          {/* Service Image */}
          <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-lg">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Book Button */}
          <button
            onClick={onBook}
            className="w-full rounded-md border-2 border-purple-600 bg-white px-4 py-2 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-50"
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

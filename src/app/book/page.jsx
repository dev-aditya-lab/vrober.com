'use client';

import bookingService from '@/lib/bookingService';
import { useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Book() {
  // State management
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceId: '',
    serviceName: '',
    servicePrice: 0,
    date: '',
    time: '',
    locationType: 'own', // 'own' or 'dropdown'
    ownAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      landmark: '',
    },
    selectedLocation: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    paymentMethod: 'card', // 'card', 'upi', 'wallet'
    specialInstructions: '',
  });

  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch services on mount (backend ready)
  useEffect(() => {
    fetchServices();
    fetchLocations();
  }, []);

  // Auto-select service from URL parameter (e.g., /book?serviceId=1)
  useEffect(() => {
    if (services.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const serviceId = params.get('serviceId');

      if (serviceId) {
        const service = services.find((s) => s.id === parseInt(serviceId));
        if (service) {
          handleServiceSelect(service);
          // Scroll to date selection for better UX
          setTimeout(() => {
            const dateInput = document.querySelector('input[type="date"]');
            if (dateInput) {
              dateInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }
      }
    }
  }, [services]);

  // Fetch available time slots when date is selected
  useEffect(() => {
    if (bookingData.date) {
      fetchAvailableTimeSlots(bookingData.date);
    }
  }, [bookingData.date]);

  // Backend integration functions using bookingService
  const fetchServices = async () => {
    try {
      const data = await bookingService.fetchServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Could show a toast notification or error message to user
    }
  };

  const fetchLocations = async () => {
    try {
      const data = await bookingService.fetchLocations();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchAvailableTimeSlots = async (date) => {
    try {
      const slots = await bookingService.fetchAvailableTimeSlots(
        date,
        bookingData.serviceId
      );
      setAvailableTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setAvailableTimeSlots([]);
    }
  };

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleAddressChange = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      ownAddress: {
        ...prev.ownAddress,
        [field]: value,
      },
    }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!bookingData.serviceId)
        newErrors.serviceId = 'Please select a service';
      if (!bookingData.date) newErrors.date = 'Please select a date';
      if (!bookingData.time) newErrors.time = 'Please select a time';
    }

    if (currentStep === 2) {
      if (bookingData.locationType === 'own') {
        if (!bookingData.ownAddress.street)
          newErrors.street = 'Street address is required';
        if (!bookingData.ownAddress.city) newErrors.city = 'City is required';
        if (!bookingData.ownAddress.zipCode)
          newErrors.zipCode = 'ZIP code is required';
      } else {
        if (!bookingData.selectedLocation)
          newErrors.selectedLocation = 'Please select a location';
      }
      if (!bookingData.customerName)
        newErrors.customerName = 'Name is required';
      if (!bookingData.customerPhone)
        newErrors.customerPhone = 'Phone is required';
      if (!bookingData.customerEmail)
        newErrors.customerEmail = 'Email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleServiceSelect = (service) => {
    setBookingData((prev) => ({
      ...prev,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
    }));
    setErrors((prev) => ({ ...prev, serviceId: '' }));
  };

  const handlePayment = async () => {
    if (!bookingData.paymentMethod) {
      setErrors({ paymentMethod: 'Please select a payment method' });
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create the booking
      const bookingResponse = await bookingService.createBooking({
        serviceId: bookingData.serviceId,
        serviceName: bookingData.serviceName,
        date: bookingData.date,
        time: bookingData.time,
        locationType: bookingData.locationType,
        address:
          bookingData.locationType === 'own' ? bookingData.ownAddress : null,
        locationId:
          bookingData.locationType === 'dropdown'
            ? bookingData.selectedLocation
            : null,
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone,
        customerEmail: bookingData.customerEmail,
        specialInstructions: bookingData.specialInstructions,
      });

      // Step 2: Initiate payment
      const paymentResponse = await bookingService.initiatePayment({
        bookingId: bookingResponse.bookingId,
        amount: bookingData.servicePrice,
        paymentMethod: bookingData.paymentMethod,
      });

      // Step 3: In production, redirect to payment gateway
      // window.location.href = paymentResponse.gatewayUrl;

      // For now, simulate successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 4: Send confirmation email
      await bookingService.sendBookingConfirmation({
        bookingId: bookingResponse.bookingId,
        email: bookingData.customerEmail,
        serviceName: bookingData.serviceName,
        date: bookingData.date,
        time: bookingData.time,
      });

      // Show confirmation modal
      setShowConfirmation(true);

      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        setShowConfirmation(false);
        // Redirect to bookings page
        window.location.href = '/bookings';
      }, 3000);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                      step >= stepNum
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {stepNum}
                  </div>
                  <p className="mt-2 text-xs font-medium text-gray-600">
                    {stepNum === 1
                      ? 'Service & Time'
                      : stepNum === 2
                        ? 'Details'
                        : 'Payment'}
                  </p>
                </div>
                {stepNum < 3 && (
                  <div
                    className={`mx-2 h-1 flex-1 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Service Selection and Date/Time */}
        {step === 1 && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Select Service & Schedule
            </h2>

            {/* Service Selection */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Choose Service *
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                      bookingData.serviceId === service.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {service.duration}
                    </p>
                    <p className="mt-2 text-lg font-bold text-blue-600">
                      ₹{service.price}
                    </p>
                  </div>
                ))}
              </div>
              {errors.serviceId && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceId}</p>
              )}
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                <FaCalendarAlt className="mr-2 inline" />
                Select Date *
              </label>
              <input
                type="date"
                min={getMinDate()}
                max={getMaxDate()}
                value={bookingData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                <FaClock className="mr-2 inline" />
                Select Time *
              </label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleInputChange('time', slot)}
                    className={`rounded-lg border-2 p-3 text-sm font-medium transition-all hover:shadow-md ${
                      bookingData.time === slot
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Next: Location & Details
            </button>
          </div>
        )}

        {/* Step 2: Location and Customer Details */}
        {step === 2 && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Location & Contact Details
            </h2>

            {/* Location Type Selection */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt className="mr-2 inline" />
                Choose Location Type *
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleInputChange('locationType', 'own')}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    bookingData.locationType === 'own'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800">My Location</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Enter your own address
                  </p>
                </button>
                <button
                  onClick={() => handleInputChange('locationType', 'dropdown')}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    bookingData.locationType === 'dropdown'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800">
                    Service Center
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Choose from our locations
                  </p>
                </button>
              </div>
            </div>

            {/* Own Address Form */}
            {bookingData.locationType === 'own' && (
              <div className="mb-6 space-y-4 rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={bookingData.ownAddress.street}
                    onChange={(e) =>
                      handleAddressChange('street', e.target.value)
                    }
                    placeholder="123 Main Street, Apt 4B"
                    className={`w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.street ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.street && (
                    <p className="mt-1 text-sm text-red-600">{errors.street}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      value={bookingData.ownAddress.city}
                      onChange={(e) =>
                        handleAddressChange('city', e.target.value)
                      }
                      placeholder="New York"
                      className={`w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      value={bookingData.ownAddress.state}
                      onChange={(e) =>
                        handleAddressChange('state', e.target.value)
                      }
                      placeholder="NY"
                      className="w-full rounded-lg border-2 border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={bookingData.ownAddress.zipCode}
                      onChange={(e) =>
                        handleAddressChange('zipCode', e.target.value)
                      }
                      placeholder="10001"
                      className={`w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={bookingData.ownAddress.landmark}
                      onChange={(e) =>
                        handleAddressChange('landmark', e.target.value)
                      }
                      placeholder="Near Central Park"
                      className="w-full rounded-lg border-2 border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Service Center Dropdown */}
            {bookingData.locationType === 'dropdown' && (
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select Service Center *
                </label>
                <select
                  value={bookingData.selectedLocation}
                  onChange={(e) =>
                    handleInputChange('selectedLocation', e.target.value)
                  }
                  className={`w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.selectedLocation
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose a location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} - {loc.address}
                    </option>
                  ))}
                </select>
                {errors.selectedLocation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.selectedLocation}
                  </p>
                )}
              </div>
            )}

            {/* Customer Details */}
            <div className="mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h3>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={bookingData.customerName}
                  onChange={(e) =>
                    handleInputChange('customerName', e.target.value)
                  }
                  placeholder="John Doe"
                  className={`w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.customerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.customerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customerName}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={bookingData.customerPhone}
                  onChange={(e) =>
                    handleInputChange('customerPhone', e.target.value)
                  }
                  placeholder="+1 (555) 123-4567"
                  className={`w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.customerPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customerPhone}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={bookingData.customerEmail}
                  onChange={(e) =>
                    handleInputChange('customerEmail', e.target.value)
                  }
                  placeholder="john.doe@example.com"
                  className={`w-full rounded-lg border-2 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.customerEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customerEmail}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={bookingData.specialInstructions}
                  onChange={(e) =>
                    handleInputChange('specialInstructions', e.target.value)
                  }
                  placeholder="Any specific requirements or notes..."
                  rows="3"
                  className="w-full rounded-lg border-2 border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Next: Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Payment & Confirmation
            </h2>

            {/* Booking Summary */}
            <div className="mb-6 rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Booking Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingData.serviceName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingData.date} at {bookingData.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingData.locationType === 'own'
                      ? `${bookingData.ownAddress.street}, ${bookingData.ownAddress.city}`
                      : locations.find(
                          (l) => l.id === parseInt(bookingData.selectedLocation)
                        )?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingData.customerPhone}
                  </span>
                </div>
                <div className="mt-4 flex justify-between border-t-2 border-gray-300 pt-4">
                  <span className="text-lg font-bold text-gray-800">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{bookingData.servicePrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                <FaCreditCard className="mr-2 inline" />
                Payment Method *
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => handleInputChange('paymentMethod', 'card')}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    bookingData.paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Credit/Debit Card
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Visa, Mastercard, AmEx
                      </p>
                    </div>
                    <FaCreditCard className="text-2xl text-gray-400" />
                  </div>
                </button>
                <button
                  onClick={() => handleInputChange('paymentMethod', 'upi')}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    bookingData.paymentMethod === 'upi'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        UPI Payment
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        GooglePay, PhonePe, Paytm
                      </p>
                    </div>
                    <span className="text-2xl">📱</span>
                  </div>
                </button>
                <button
                  onClick={() => handleInputChange('paymentMethod', 'wallet')}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    bookingData.paymentMethod === 'wallet'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Digital Wallet
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Paytm, Amazon Pay
                      </p>
                    </div>
                    <span className="text-2xl">💳</span>
                  </div>
                </button>
              </div>
              {errors.paymentMethod && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay ₹${bookingData.servicePrice}`}
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
              <FaCheckCircle className="mx-auto mb-4 text-6xl text-green-600" />
              <h2 className="mb-2 text-2xl font-bold text-gray-800">
                Booking Confirmed!
              </h2>
              <p className="mb-4 text-gray-600">
                Your booking has been successfully confirmed. We&apos;ll send
                you a confirmation email shortly.
              </p>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Booking ID</p>
                <p className="text-xl font-bold text-blue-600">
                  #BK{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

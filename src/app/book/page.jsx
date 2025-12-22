'use client';

import { useEffect, useState } from 'react';
import { fetchServices, createBooking } from '@/lib/bookingService';
import { FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function Book() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const load = async () => {
      let data = [];
      try {
        const response = await fetchServices();
        data = Array.isArray(response) ? response : response?.data || [];
        setServices(Array.isArray(data) ? data : []);
        setErrorMessage('');
      } catch (err) {
        console.error('Failed to load services', err);
        setServices([]);
        setErrorMessage('Could not load services. Please try again.');
      }
      const params = new URLSearchParams(window.location.search);
      const sId = params.get('serviceId');
      const sName = params.get('serviceName');
      const sPrice = params.get('price');

      if (sId) {
        // If service details are passed via URL, use them directly
        if (sName && sPrice) {
          setServiceId(sId);
          setServiceName(decodeURIComponent(sName));
          setPrice(Number(sPrice) || 0);
          setErrors((e) => ({ ...e, serviceId: '' }));
        } else {
          // Otherwise, find the service in the data
          const found = data.find((s) => String(s.id) === String(sId));
          if (found) selectService(found);
        }
      }
    };
    load();
  }, []);

  const availableTimeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  const selectService = (s) => {
    setServiceId(s.id);
    setVendorId(s.vendorId || '');
    setServiceName(s.name);
    setPrice(s.price || 0);
    setErrors((e) => ({ ...e, serviceId: '' }));
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      // Using Open Street Map Nominatim API for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data) {
        // Method 1: Use the display_name which has the full address string
        if (data.display_name) {
          return data.display_name;
        }
        
        // Method 2: Build from address components if display_name not available
        if (data.address) {
          const addr = data.address;
          const addressParts = [];
          
          // Add all available address components in order
          if (addr.house_number) addressParts.push(addr.house_number);
          if (addr.road) addressParts.push(addr.road);
          if (addr.residential) addressParts.push(addr.residential);
          if (addr.neighbourhood) addressParts.push(addr.neighbourhood);
          if (addr.suburb) addressParts.push(addr.suburb);
          if (addr.village) addressParts.push(addr.village);
          if (addr.town) addressParts.push(addr.town);
          if (addr.city) addressParts.push(addr.city);
          if (addr.county) addressParts.push(addr.county);
          if (addr.district) addressParts.push(addr.district);
          if (addr.state) addressParts.push(addr.state);
          if (addr.postcode) addressParts.push(addr.postcode);
          if (addr.country) addressParts.push(addr.country);
          
          const fullAddress = addressParts.join(', ');
          return fullAddress || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        }
        
        return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      }
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
      console.warn('Address lookup failed:', error);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  };

  const searchAddress = async (query) => {
    if (!query || query.length < 3) {
      setSearchSuggestions([]);
      return;
    }
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setSearchSuggestions(data.map(item => ({
          display_name: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon)
        })));
        setShowSuggestions(true);
      }
    } catch (error) {
      console.warn('Address search failed:', error);
      setSearchSuggestions([]);
    }
  };

  const selectAddressFromSearch = (suggestion) => {
    setAddress(suggestion.display_name);
    setLat(suggestion.lat.toFixed(6));
    setLng(suggestion.lon.toFixed(6));
    setSearchSuggestions([]);
    setShowSuggestions(false);
    setLocationStatus('✓ Address selected!');
    setTimeout(() => setLocationStatus(''), 2000);
  };

  const useCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationStatus('❌ Geolocation not supported on your browser');
      return;
    }
    setLocationStatus('📍 Fetching your location...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude.toFixed(6));
        setLng(longitude.toFixed(6));
        
        // Get detailed address from coordinates
        setLocationStatus('🔍 Getting address details...');
        const fullAddress = await getAddressFromCoordinates(latitude, longitude);
        setAddress(fullAddress);
        
        setLocationStatus('✓ Location found!');
        setTimeout(() => setLocationStatus(''), 3000); // Clear after 3s
      },
      (err) => {
        let msg = 'Unable to access location';
        if (err.code === 1) {
          msg = '⚠️ Location permission denied. Please enable in browser settings.';
        } else if (err.code === 2) {
          msg = '⚠️ Location unavailable. Check your network & GPS.';
        } else if (err.code === 3) {
          msg = '⚠️ Location request timed out. Try again.';
        }
        setLocationStatus(msg);
        console.warn('Geolocation:', msg, err.code);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5000 }
    );
  };

  const relatedServices = services
    .filter((s) => s.id !== serviceId)
    .slice(0, 3);

  const submitBooking = async () => {
    // Check if user is authenticated
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      alert('Please log in to book a service');
      window.location.href = '/login';
      return;
    }

    const newErrors = {};
    if (!serviceId) newErrors.serviceId = 'Select a service';
    if (!date) newErrors.date = 'Pick a date';
    if (!time) newErrors.time = 'Pick a time';
    if (!address) newErrors.address = 'Enter address';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        serviceId,
        vendorId: vendorId || undefined, // Optional - will be assigned by admin
        serviceDate: date,
        serviceTime: time,
        address,
        location: {
          lat: lat ? Number(lat) : undefined,
          lng: lng ? Number(lng) : undefined,
          manual: manualLocation || undefined,
        },
        price,
        description: serviceName,
        specialInstructions,
        paymentMethod,
      };

      // Log the payload for debugging
      console.log('Booking payload:', payload);

      await createBooking(payload);
      setShowConfirmation(true);
      setTimeout(() => {
        window.location.href = '/bookings';
      }, 2000);
    } catch (err) {
      console.error('Booking submission error:', err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to create booking';
      alert(`Booking failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];
  const getMaxDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-black">Book a Service</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Select Service *
              </label>
              <div className="max-h-72 divide-y overflow-y-auto rounded-lg border">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectService(s)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                      serviceId === s.id
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="text-sm">₹{s.price}</span>
                  </button>
                ))}
              </div>
              {errors.serviceId && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceId}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                <FaCalendarAlt className="mr-2 inline" /> Date *
              </label>
              <input
                type="date"
                value={date}
                min={getMinDate()}
                max={getMaxDate()}
                onChange={(e) => setDate(e.target.value)}
                className={`input-premium ${errors.date && 'border-red-500'}`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                <FaClock className="mr-2 inline" /> Time *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`rounded-lg border px-2 py-2 text-sm ${
                      time === slot
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
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
          </div>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Address *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    searchAddress(e.target.value);
                  }}
                  onFocus={() => searchSuggestions.length > 0 && setShowSuggestions(true)}
                  className={`input-premium w-full ${errors.address && 'border-red-500'}`}
                  placeholder="Type your city, area, or full address..."
                />
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-40 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                    {searchSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectAddressFromSearch(suggestion)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                      >
                        {suggestion.display_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={useCurrentLocation}
                  disabled={locationStatus.includes('Fetching')}
                  className="rounded-lg bg-gradient-to-r from-gray-800 to-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {locationStatus.includes('Fetching') ? '⏳ Fetching...' : '📍 Use current location (if on mobile)'}
                </button>
                <p className="text-xs text-gray-600 italic">💡 On laptop? Search your city/area above or enable location</p>
                {locationStatus && (
                  <p className={`text-sm font-medium ${
                    locationStatus.includes('✓') ? 'text-green-600' :
                    locationStatus.includes('❌') || locationStatus.includes('⚠️') ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {locationStatus}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-black">
                Additional location details (Optional)
              </label>
              <input
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                className="input-premium"
                placeholder="Landmark / Gate code / Floor / Apt number"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Special Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
                className="input-premium"
                placeholder="Notes for Partner (e.g., call upon arrival)"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="input-premium"
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>
            <button
              type="button"
              onClick={submitBooking}
              disabled={loading}
              className="btn-primary mb-8 w-full"
            >
              {loading
                ? 'Booking...'
                : serviceId
                  ? `Confirm Booking (₹${price})`
                  : 'Select a service'}
            </button>
          </div>
        </div>
        {relatedServices.length > 0 && (
          <div className="mt-10 rounded-xl bg-white/95 p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-black">You may also like</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedServices.map((s) => (
                <div
                  key={s.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-black">{s.name}</h4>
                    <span className="text-sm text-gray-600">₹{s.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectService(s)}
                    className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-900 hover:text-black"
                  >
                    Choose this
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="animate-fade-in mt-8 rounded-xl border bg-white p-8 text-center">
            <FaCheckCircle className="mx-auto mb-4 text-5xl text-green-600" />
            <h2 className="mb-2 text-2xl font-bold">Booking Confirmed</h2>
            <p className="text-sm text-gray-600">
              Redirecting to your bookings...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { FiPhone, FiClock, FiMessageSquare, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import api from '@/lib/axios';

export default function CallbackPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    note: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (form.phone.trim() && !/^\d{10,}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setStatus(null);
    
    try {
      await api.post('/callbacks', form);
      setStatus({ 
        type: 'success', 
        message: 'Thank you! Our team will contact you shortly.' 
      });
      setForm({ name: '', phone: '', preferredTime: '', note: '' });
      setErrors({});
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to submit callback request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <FiPhone className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Request a Callback
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Can't find what you're looking for? Our support team is ready to help. Submit your details and we'll reach out to you shortly.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow p-4 flex items-start gap-3">
            <div className="flex-shrink-0">
              <FiClock className="h-5 w-5 text-primary-600 mt-1" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Quick Response</h3>
              <p className="text-sm text-gray-600">We typically respond within 24 hours</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 flex items-start gap-3">
            <div className="flex-shrink-0">
              <FiMessageSquare className="h-5 w-5 text-primary-600 mt-1" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Always Available</h3>
              <p className="text-sm text-gray-600">Submit anytime, anywhere</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
            <h2 className="text-xl font-semibold text-white">Your Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Success Message */}
            {status?.type === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                <FiCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">{status.message}</p>
                  <p className="text-sm text-green-700 mt-1">We'll reach out to the provided phone number.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status?.type === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <FiAlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="text-sm text-red-700 mt-1">{status.message}</p>
                </div>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-primary-500 focus:bg-primary-50'
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none ${
                  errors.phone
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-primary-500 focus:bg-primary-50'
                }`}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Preferred Time Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Preferred Time to Call (Optional)
              </label>
              <select
                name="preferredTime"
                value={form.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:bg-primary-50 transition focus:outline-none"
              >
                <option value="">Select a time slot</option>
                <option value="09:00-12:00">9:00 AM - 12:00 PM</option>
                <option value="12:00-15:00">12:00 PM - 3:00 PM</option>
                <option value="15:00-18:00">3:00 PM - 6:00 PM</option>
                <option value="18:00-21:00">6:00 PM - 9:00 PM</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>

            {/* Note Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Message (Optional)
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Tell us what you need. We're here to help!"
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:bg-primary-50 transition focus:outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{form.note.length}/500 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiPhone className="h-5 w-5" />
                  Request Callback
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Your information is safe with us. We'll never share it with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}

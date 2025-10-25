'use client';

import { sendOTP, verifyOTP } from '@/lib/authService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FaArrowLeft, FaShieldHalved } from 'react-icons/fa6';

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState(''); // For dev testing

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  // Handle OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 4) {
      setOtp(value);
      setError('');
    }
  };

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await sendOTP(phoneNumber);
      console.log('OTP Response:', response);

      // Store OTP for dev testing (remove in production)
      if (response.otp) {
        setGeneratedOTP(response.otp);
      }

      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verifyOTP(phoneNumber, otp);
      console.log('Verify Response:', response);

      // Backend sets auth cookie (withCredentials). No need to store token in localStorage.
      router.push('/');
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  // Change phone number (go back to phone input)
  const handleChangeNumber = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setGeneratedOTP('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <div className="sticky top-0 bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          {step === 'otp' && (
            <button
              onClick={handleChangeNumber}
              className="flex items-center text-zinc-600 hover:text-blue-700"
              disabled={loading}
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="relative mx-auto w-32">
            <Image
              src="/FulllogoBlack .png"
              alt="Vrober Logo"
              className="h-full w-full"
              width={1573}
              height={512}
            />
          </div>
          {step === 'otp' && <div className="w-5" />}{' '}
          {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 py-8">
        <div className="mx-auto max-w-md">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-800">
              {step === 'phone' ? 'Welcome to Vrober' : 'Verify your number'}
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              {step === 'phone'
                ? 'Login or signup to book services at your doorstep'
                : `We've sent a 4-digit OTP to +91 ${phoneNumber}`}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Dev Testing Info */}
          {generatedOTP && step === 'otp' && (
            <div className="mb-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
              <strong>🔧 Dev Mode:</strong> Your OTP is{' '}
              <strong className="text-lg">{generatedOTP}</strong>
            </div>
          )}

          {/* Phone Number Form */}
          {step === 'phone' && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Whatsapp Number
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-base font-medium text-zinc-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={`Enter WhatsApp number`}
                    className="w-full rounded-lg border border-gray-300 bg-white py-4 pr-4 pl-16 text-lg font-medium text-zinc-800 placeholder:text-zinc-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                    disabled={loading}
                    autoFocus
                    inputMode="numeric"
                  />
                </div>
                <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
                  <FaWhatsapp /> You&apos;ll receive an OTP for verification
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || phoneNumber.length !== 10}
                className="w-full rounded-lg bg-blue-700 py-4 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  'Continue'
                )}
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                <FaShieldHalved className="text-green-600" />
                <span>Secure & encrypted login</span>
              </div>
            </form>
          )}

          {/* OTP Form */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Enter OTP
                </label>
                <input
                  type="tel"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="••••"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-4 text-center text-3xl font-bold tracking-[0.5em] text-zinc-800 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 focus:outline-none"
                  disabled={loading}
                  autoFocus
                  inputMode="numeric"
                  maxLength={4}
                />
                <p className="mt-2 text-xs text-zinc-500">
                  Enter the 4-digit code sent to your WhatsApp
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 4}
                className="w-full rounded-lg bg-blue-700 py-4 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline disabled:cursor-not-allowed disabled:text-zinc-400"
                >
                  Didn&apos;t receive OTP? Resend
                </button>
              </div>
            </form>
          )}

          {/* Footer Text */}
          <div className="mt-8 text-center text-xs text-zinc-500">
            By continuing, you agree to Vrober&apos;s{' '}
            <a href="/terms" className="text-blue-700 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-700 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave (Optional) */}
      <div className="fixed right-0 bottom-0 left-0 -z-10 h-32 bg-gradient-to-t from-blue-50 to-transparent opacity-50" />
    </div>
  );
}

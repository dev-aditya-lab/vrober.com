'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated } from '@/lib/authService';

export default function PartnerRoute({ children, redirectTo = '/login' }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!isAuthenticated()) {
        router.replace(redirectTo);
        return;
      }
      const user = getCurrentUser();
      if (user?.role === 'partner') {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
      setChecking(false);
    };
    check();
  }, [router, redirectTo]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 font-medium text-gray-600">Checking access…</p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-black">Partner Access Only</h1>
          <p className="mt-2 text-gray-700">
            This area is reserved for partners. Please log in with a partner
            account or contact support.
          </p>
        </div>
      </div>
    );
  }

  return children;
}

'use client';
import { useState, useEffect } from 'react';

/**
 * Custom hook to get and track user's current location
 * Features:
 * - Auto-detects geolocation
 * - Caches location in localStorage
 * - Provides fallback handling
 * - Returns city, state code format (e.g., "Ranchi, JH")
 */
export default function useUserLocation() {
  const [location, setLocation] = useState({
    text: 'Detecting...',
    city: '',
    state: '',
    coords: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Try to get from localStorage first (cached)
    const cachedLocation = localStorage.getItem('userLocation');
    const cachedCoords = localStorage.getItem('userCoords');

    if (cachedLocation) {
      try {
        const coords = cachedCoords ? JSON.parse(cachedCoords) : null;
        const [city, state] = cachedLocation.split(', ');
        setLocation({
          text: cachedLocation,
          city: city || '',
          state: state || '',
          coords,
          isLoading: false,
          error: null,
        });
      } catch (e) {
        console.warn('Failed to parse cached location:', e);
      }
    }

    // Try to get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const coords = { lat: latitude, lng: longitude };

            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const data = await response.json();

            // Extract city and state
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.county ||
              'Unknown';
            const state = data.address?.state || '';
            const stateCode = state
              ? state
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()
              : '';

            const locationText = stateCode ? `${city}, ${stateCode}` : city;

            setLocation({
              text: locationText,
              city,
              state: stateCode,
              coords,
              isLoading: false,
              error: null,
            });

            // Cache for future use
            localStorage.setItem('userLocation', locationText);
            localStorage.setItem('userCoords', JSON.stringify(coords));
          } catch (error) {
            console.warn('Location name fetch failed:', error);
            const fallback = cachedLocation || 'India';
            setLocation({
              text: fallback,
              city: fallback,
              state: '',
              coords: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              isLoading: false,
              error: 'Failed to get location name',
            });
          }
        },
        (error) => {
          console.warn('Geolocation error:', error.code);
          // Fallback to default or cached
          const fallback = cachedLocation || 'Ranchi, JH';
          const [city, state] = fallback.split(', ');

          setLocation({
            text: fallback,
            city: city || fallback,
            state: state || 'JH',
            coords: cachedCoords ? JSON.parse(cachedCoords) : null,
            isLoading: false,
            error:
              error.code === 1
                ? 'Location permission denied'
                : 'Location unavailable',
          });
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 300000, // Cache for 5 minutes
        }
      );
    } else {
      // No geolocation support
      const fallback = cachedLocation || 'Ranchi, JH';
      const [city, state] = fallback.split(', ');

      setLocation({
        text: fallback,
        city: city || fallback,
        state: state || 'JH',
        coords: null,
        isLoading: false,
        error: 'Geolocation not supported',
      });
    }
  }, []);

  return location;
}

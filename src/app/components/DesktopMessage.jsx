'use client';
import { useEffect, useState } from 'react';

export default function DesktopMessage() {
    const [isVisible, setIsVisible] = useState(true);
    const [currentIcon, setCurrentIcon] = useState(0);

    // Animated icons for mobile devices
    const mobileIcons = ['📱', '💻', '🔧', '🏠'];

    // Cycle through icons for animation
    useEffect(() => {
        const iconInterval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % mobileIcons.length);
        }, 2000);

        return () => clearInterval(iconInterval);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="hidden md:flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Floating Circles */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute top-60 right-32 w-24 h-24 bg-indigo-200 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Floating Service Icons */}
                <div className="absolute top-32 right-20 text-4xl animate-float">🔧</div>
                <div className="absolute bottom-32 left-20 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🏠</div>
                <div className="absolute top-1/2 left-10 text-4xl animate-float" style={{ animationDelay: '3s' }}>⚡</div>
                <div className="absolute bottom-20 right-1/3 text-4xl animate-float" style={{ animationDelay: '2.5s' }}>🔨</div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto">
                    {/* Animated Mobile Icon */}
                    <div className="mb-8">
                        <div className="inline-block p-6 bg-white rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300">
                            <span className="text-6xl animate-bounce inline-block">
                                {mobileIcons[currentIcon]}
                            </span>
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Vrober
                            </span>
                            {" "}is Mobile First! 📱
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
                            We've crafted an amazing mobile experience just for you!
                            Our desktop version is currently under development.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mx-auto max-w-md">
                            <p className="text-blue-800 font-medium mb-2">
                                📱 For the best experience:
                            </p>
                            <ul className="text-blue-700 text-sm space-y-1">
                                <li>• Open this website on your mobile device</li>
                                <li>• Add to your home screen for quick access</li>
                                <li>• Enjoy our optimized mobile interface</li>
                            </ul>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                📋 Copy Link to Share
                            </button>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 hover:border-gray-400"
                            >
                                Continue Anyway
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            💻 Desktop version coming soon with more features!
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100 to-transparent opacity-50"></div>
        </div>
    );
}
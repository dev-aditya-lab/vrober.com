import { FiCheck, FiUsers, FiTrendingUp, FiShield, FiClock, FiSmile } from 'react-icons/fi';

export const metadata = {
  title: 'About Vrober - Your Trusted Service Marketplace',
  description: 'Vrober connects you with professional service providers. Quality, reliability, and convenience in one platform.',
};

export default function About() {
  const features = [
    {
      icon: FiShield,
      title: 'Verified Professionals',
      description: 'All service providers are thoroughly vetted and verified for quality and reliability.'
    },
    {
      icon: FiClock,
      title: 'Easy Booking',
      description: 'Book services in minutes with flexible scheduling options that work for you.'
    },
    {
      icon: FiSmile,
      title: 'Quality Assurance',
      description: 'We ensure high-quality service delivery with customer satisfaction guarantees.'
    },
    {
      icon: FiTrendingUp,
      title: 'Growing Network',
      description: 'Access to hundreds of professional service providers across multiple categories.'
    },
    {
      icon: FiUsers,
      title: 'Community Driven',
      description: 'Join thousands of satisfied customers who trust Vrober for their service needs.'
    },
    {
      icon: FiCheck,
      title: 'Transparent Pricing',
      description: 'No hidden charges. Know exactly what you\'re paying for upfront.'
    }
  ];

  const values = [
    {
      title: 'Trust',
      description: 'Building trust between customers and service providers through transparency and accountability.'
    },
    {
      title: 'Quality',
      description: 'Maintaining high standards in service delivery and customer experience.'
    },
    {
      title: 'Accessibility',
      description: 'Making professional services accessible and affordable for everyone.'
    },
    {
      title: 'Innovation',
      description: 'Continuously improving our platform to serve you better.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 md:py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Vrober
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-6">
              Connecting You with Professional Service Providers You Can Trust
            </p>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Vrober is your go-to marketplace for quality services. Whether you need cleaning, salons, repairs, or other professional services, we make it easy to find, book, and pay for trusted providers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To revolutionize the service industry by creating a seamless, trustworthy platform that connects customers with qualified professionals. We empower service providers to grow their business while giving customers access to reliable, affordable services at their fingertips.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the most trusted and user-friendly service marketplace in the region, where every customer can easily find quality services and every professional can build a thriving business. We envision a world where professional services are just one tap away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vrober */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Vrober?
            </h2>
            <p className="text-gray-600 text-lg">
              We're committed to making professional services accessible and trustworthy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="border-l-4 border-primary-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Vrober Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Browse Services
              </h3>
              <p className="text-gray-600">
                Explore hundreds of verified professionals across various service categories.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Book Your Service
              </h3>
              <p className="text-gray-600">
                Select your preferred provider, choose a time that works for you, and book instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Enjoy Quality Service
              </h3>
              <p className="text-gray-600">
                Receive professional service and share your feedback to help us improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-600 text-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-primary-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-primary-100">Professional Providers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-primary-100">Services Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Book Your Service?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Vrober for their service needs.
          </p>
          <a 
            href="/services"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Browse Services
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Have questions? We'd love to hear from you!
          </p>
          <a 
            href="/contact"
            className="inline-block text-primary-600 font-semibold hover:underline"
          >
            Contact Us →
          </a>
        </div>
      </section>
    </div>
  );
}

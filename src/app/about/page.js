export const metadata = {
  title: 'About Us - Vrober',
  description: 'Learn more about Vrober and our mission',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About Vrober
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Building innovative solutions for the modern web
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="leading-relaxed text-gray-600">
                We are dedicated to creating exceptional web experiences that
                combine cutting-edge technology with intuitive design. Our goal
                is to help businesses and individuals establish a strong online
                presence through innovative web solutions.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Our Vision
              </h2>
              <p className="leading-relaxed text-gray-600">
                To be the leading platform that empowers creators and businesses
                to build remarkable web experiences that engage users and drive
                growth in the digital landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

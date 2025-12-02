import React, { useEffect } from 'react';

const WhyChooseUs = () => {
  useEffect(() => {
    // Animation keyframes
    const styles = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      
      .animation-delay-100 {
        animation-delay: 0.1s;
      }
      
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      
      .animation-delay-300 {
        animation-delay: 0.3s;
      }
      
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      
      .animation-delay-500 {
        animation-delay: 0.5s;
      }
      
      .animation-delay-1000 {
        animation-delay: 1s;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
    `;

    // Add styles to the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Cleanup function
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Why Choose Us ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-3"></div>
            Trusted By Thousands Of Businesses Across India
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {/* Card 1: Transparent Model */}
          <div className="group bg-white rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-200 h-full flex flex-col">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-105">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              Transparent Model
            </h3>
            <p className="text-gray-600 text-sm">
              Clear and honest business practices
            </p>
          </div>

          {/* Card 2: Fast Buyer Connect */}
          <div className="group bg-white rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-green-200 h-full flex flex-col">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-105">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
              Fast Buyer Connect
            </h3>
            <p className="text-gray-600 text-sm">
              Quick connections with verified buyers
            </p>
          </div>

          {/* Card 3: Genuine Leads Only */}
          <div className="group bg-white rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-purple-200 h-full flex flex-col">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-105">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
              Genuine Leads Only
            </h3>
            <p className="text-gray-600 text-sm">
              Verified and authentic business leads
            </p>
          </div>

          {/* Card 4: High Conversion Ratio */}
          <div className="group bg-white rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-orange-200 h-full flex flex-col">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-105">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
              High Conversion
            </h3>
            <p className="text-gray-600 text-sm">
              Better lead-to-customer conversion
            </p>
          </div>

          {/* Card 5: Complete B2B Solution */}
          <div className="group bg-white rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-red-200 h-full flex flex-col">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-105">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
              B2B Solution
            </h3>
            <p className="text-gray-600 text-sm">
              All business needs in one place
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs

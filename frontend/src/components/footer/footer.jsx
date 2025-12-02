import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up">
            Ready To Grow Your Business
          </h2>
          <p className="text-gray-300 text-sm mb-4 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Join thousands of businesses already trading on our portal. Start connecting with buyers and sellers today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <button className="px-5 py-1.5 text-xs bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow hover:shadow-sm">
              Register as Buyer
            </button>
            <Link 
              to="/seller-register"
              className="px-5 py-1.5 text-xs bg-transparent border border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              Register as Seller
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Customer Support */}
          <div className="animate-fade-in-up animation-delay-100">
            <h3 className="font-semibold text-base mb-3 text-white hover:text-blue-400 transition-colors duration-300">
              Customer Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  User Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Return & Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Shipping & Delivery Policy
                </a>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div className="animate-fade-in-up animation-delay-200">
            <h3 className="font-semibold text-base mb-3 text-white hover:text-blue-400 transition-colors duration-300">
              About Us
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  About Our Company
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Jobs & Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Partner with Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Make a Payment
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Weekly Newsletter
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="animate-fade-in-up animation-delay-300">
            <h3 className="font-semibold text-base mb-3 text-white hover:text-blue-400 transition-colors duration-300">
              Our Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Advertise with Us
                </a>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="animate-fade-in-up animation-delay-400">
            <h3 className="font-semibold text-base mb-3 text-white hover:text-blue-400 transition-colors duration-300">
              For Sellers
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Display New Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Buy Trade Leads
                </a>
              </li>
            </ul>
          </div>

          {/* For Buyers */}
          <div className="animate-fade-in-up animation-delay-500">
            <h3 className="font-semibold text-base mb-3 text-white hover:text-blue-400 transition-colors duration-300">
              For Buyers
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Post Your Requirement
                </a>
              </li>
            </ul>
          </div>

          {/* Directory */}
          <div className="animate-fade-in-up animation-delay-600">
            <h3 className="font-semibold text-base mb-3 text-white hover:text-blue-400 transition-colors duration-300">
              Directory
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors duration-200 transform hover:translate-x-1 inline-block">
                  Manufacturers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-center text-gray-400 text-xs">
            <p>&copy; 2026 AarnixTech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
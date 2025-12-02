import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SellerForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    gstNumber: '',
    panNumber: '',
    businessCategory: '',
    yearEstablished: '',
    website: '',
    businessDescription: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return re.test(String(email).toLowerCase())
  }

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/
    return re.test(phone)
  }

  const validateName = (name) => {
    const re = /^[a-zA-Z\s]{2,50}$/
    return re.test(name)
  }

  const validateWebsite = (url) => {
    if (!url) return true // Optional field
    const re = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
    return re.test(url)
  }

  const validateGST = (gst) => {
    if (!gst) return true // Optional field
    const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return re.test(gst)
  }

  const validatePAN = (pan) => {
    if (!pan) return true // Optional field
    const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return re.test(pan)
  }

  const validateForm = () => {
    const errors = {}
    
    if (!validateName(formData.contactPerson)) {
      errors.contactPerson = 'Please enter a valid full name (letters and spaces only)'
    }
    
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    if (formData.website && !validateWebsite(formData.website)) {
      errors.website = 'Please enter a valid website URL'
    }
    
    if (formData.gstNumber && !validateGST(formData.gstNumber)) {
      errors.gstNumber = 'Please enter a valid GST number'
    }
    
    if (formData.panNumber && !validatePAN(formData.panNumber)) {
      errors.panNumber = 'Please enter a valid PAN number'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      setError('Please correct the errors in the form')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Map form data to match backend schema
      const sellerData = {
        businessName: formData.companyName,
        businessType: 'Company',
        email: formData.email,
        phone: formData.phone,
        businessDescription: formData.businessDescription,
        website: formData.website || '',
        address: {
          street: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          postalCode: formData.pincode,
          country: formData.country
        },
        documents: {
          taxId: formData.gstNumber || '',
          registrationNumber: formData.panNumber || '',
          idProof: '',
          addressProof: ''
        },
        businessCategory: formData.businessCategory,
        yearEstablished: formData.yearEstablished,
        contactPerson: formData.contactPerson
      }

      console.log('Submitting seller data:', sellerData)
      
      const response = await axios.post('http://localhost:5000/api/sellers', sellerData)
      
      console.log('Response:', response.data)
      setSuccess(true)
      
      // Reset form after successful submission
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        gstNumber: '',
        panNumber: '',
        businessCategory: '',
        yearEstablished: '',
        website: '',
        businessDescription: ''
      })

      // Show success message
      setTimeout(() => {
        setSuccess(false)
      }, 5000)

    } catch (err) {
      console.error('Error submitting form:', err)
      console.error('Error response data:', err.response?.data)
      if (err.response) {
        setError(err.response.data.message || 'Failed to submit application. Please try again.')
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl border border-gray-800">
          {/* Header with gradient background */}
          <div className="bg-black p-8 text-center relative overflow-hidden border-b border-gray-800">
            <div className="absolute inset-0 bg-gray-900 opacity-10 transform rotate-45 translate-x-full animate-pulse"></div>
            
            {/* Back Button */}
            <Link 
              to="/"
              className="absolute top-4 left-4 bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 border border-gray-700"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </Link>
            
            <h2 className="text-4xl font-bold text-white mb-3 relative z-10 animate-fade-in-down">
              Register as Seller
            </h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full animate-pulse"></div>
          </div>
          
          <div className="p-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-900 border-2 border-green-400 text-green-100 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-bold text-white">Application submitted successfully! We will contact you soon.</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900 border-2 border-red-400 text-red-100 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-bold text-white">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-gray-900 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gray-800 rounded-full mr-3 animate-pulse"></span>
                  Business Information
                </h3>
        
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="mb-2">
                      <label className="block text-sm font-bold text-white mb-2 group-hover:text-slate-300 transition-colors duration-200">
                        Company Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border ${formErrors.companyName ? 'border-red-500' : 'border-gray-600'} rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 transform hover:border-gray-500 text-white placeholder-gray-400`}
                          placeholder="e.g., Tech Solutions India Pvt. Ltd."
                        />
                        {formErrors.companyName && <p className="mt-1 text-sm text-red-500">{formErrors.companyName}</p>}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="mb-2">
                      <label className="block text-sm font-bold text-white mb-2 group-hover:text-slate-300 transition-colors duration-200">
                        Contact Person *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border ${formErrors.contactPerson ? 'border-red-500' : 'border-gray-600'} rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 transform hover:border-gray-500 text-white placeholder-gray-400`}
                          placeholder="e.g., Rajesh Kumar-BDM"
                        />
                        {formErrors.contactPerson && <p className="mt-1 text-sm text-red-500">{formErrors.contactPerson}</p>}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="mb-2">
                      <label className="block text-sm font-bold text-white mb-2 group-hover:text-slate-300 transition-colors duration-200">
                        Business Email *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border ${formErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 transform hover:border-gray-500 text-white placeholder-gray-400`}
                          placeholder="e.g., info@techsolutions.in"
                        />
                        {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="mb-2">
                      <label className="block text-sm font-bold text-white mb-2 group-hover:text-slate-300 transition-colors duration-200">
                        Business Phone *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border ${formErrors.phone ? 'border-red-500' : 'border-gray-600'} rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 transform hover:border-gray-500 text-white placeholder-gray-400`}
                          placeholder="e.g., 9876543210"
                        />
                        {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Business Address Section */}
              <div className="bg-gray-900 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gray-800 rounded-full mr-3 animate-pulse"></span>
                  Business Address
                </h3>
                
                <div className="mb-6">
                  <div className="mb-2">
                    <label className="block text-sm font-bold text-white mb-2">
                      Registered Office Address *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400"
                        placeholder="e.g., A-123, Business Tower, 5th Floor, MG Road"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="Mumbai"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="Maharashtra"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="India"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
              
              {/* Business Details Section */}
              <div className="bg-gray-900 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gray-800 rounded-full mr-3 animate-pulse"></span>
                  Business Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      GST Number (if applicable)
                    </label>
                    <div className="w-full">
                      <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border ${formErrors.gstNumber ? 'border-red-500' : 'border-gray-600'} rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400`}
                        placeholder="e.g., 22AAAAA0000A1Z5"
                        pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                        title="Please enter a valid GST number"
                      />
                      {formErrors.gstNumber && <p className="mt-1 text-sm text-red-500">{formErrors.gstNumber}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Company PAN Number
                    </label>
                    <div className="w-full">
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border ${formErrors.panNumber ? 'border-red-500' : 'border-gray-600'} rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400`}
                        placeholder="e.g., AABCT1234D"
                      />
                      {formErrors.panNumber && <p className="mt-1 text-sm text-red-500">{formErrors.panNumber}</p>}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Business Category *
                    </label>
                    <select
                      name="businessCategory"
                      value={formData.businessCategory}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400"
                    >
                      <option value="">Select your business category</option>
                      
                      <optgroup label="Product-based">
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Trader">Trader</option>
                        <option value="Supplier">Supplier</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Exporter">Exporter</option>
                        <option value="Importer">Importer</option>
                      </optgroup>
                      
                      <optgroup label="Retail & Online">
                        <option value="Retailer">Retailer</option>
                        <option value="Online Seller">Online Seller</option>
                        <option value="E-Commerce Business">E-Commerce Business</option>
                      </optgroup>
                      
                      <optgroup label="Service-based">
                        <option value="Service Provider">Service Provider</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Contractor">Contractor</option>
                      </optgroup>
                      
                      <optgroup label="Others">
                        <option value="Franchise">Franchise</option>
                        <option value="Stockist">Stockist</option>
                        <option value="Wholesaling Agent">Wholesaling Agent</option>
                        <option value="Buying Office">Buying Office</option>
                      </optgroup>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Year Established
                    </label>
                    <input
                      type="number"
                      name="yearEstablished"
                      value={formData.yearEstablished}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="e.g., 2010"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Company Website
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 text-sm font-bold text-white bg-gray-800 border border-r-0 border-gray-600 rounded-l-xl">
                      https://
                    </span>
                    <div className="flex-1 min-w-0">
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border ${formErrors.website ? 'border-red-500' : 'border-gray-600'} border-l-0 rounded-r-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 text-white placeholder-gray-400`}
                        placeholder="yourcompany.com"
                        pattern="https?://.+"
                        title="Please include http:// or https://"
                    />
                  </div>
                </div>
              </div>
              </div>
              
              {/* Business Description Section */}
              <div className="bg-gray-900 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gray-800 rounded-full mr-3 animate-pulse"></span>
                  Business Description
                </h3>
                
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Business Description *
                  </label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition-all duration-300 resize-none text-white placeholder-gray-400"
                    placeholder="e.g., We are a leading manufacturer of eco-friendly packaging solutions with 15+ years of experience, serving clients across India and exporting to 10+ countries. Our B2B model focuses on providing sustainable packaging alternatives to FMCG companies..."
                  />
                </div>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 text-lg font-bold text-white rounded-xl transition-all duration-300 transform ${
                    loading 
                      ? 'bg-indigo-700 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105'
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerForm

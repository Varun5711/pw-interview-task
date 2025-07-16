import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Monitor,
  Camera,
  Cpu,
  Cable,
  Mouse,
  Keyboard,
  Check,
  X,
  Loader,
} from "lucide-react";
import axios from "./lib/axios";

const App = () => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    gender: "male",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const addOns = [
    { id: "webcam", name: "Webcam", price: 29.99, icon: Camera },
    {
      id: "monitor",
      name: "LED Monitor",
      subtitle: "(19 Inch)",
      price: 159.99,
      icon: Monitor,
    },
  ];

  const basePrice = 99.99;
  const totalPrice =
    basePrice + selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);

  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((item) => item.id === addon.id);
      if (exists) {
        return prev.filter((item) => item.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10,15}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      address: formData.address,
      gender: formData.gender,
      basePrice,
      totalPrice,
      addOns: selectedAddOns.map(({ id, name, price }) => ({
        id,
        name,
        price,
      })),
    };
  
    try {
      await axios.post('/submit', payload);
      setNotification({
        type: "success",
        message: "Order placed successfully!",
      });
      setIsFormVisible(false);
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        address: "",
        gender: "male",
      });
      setSelectedAddOns([]);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to place order. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm border transform transition-all duration-300 flex items-center gap-3 max-w-md ${
            notification.type === "success"
              ? "bg-green-500/20 border-green-500/50 text-green-100"
              : "bg-red-500/20 border-red-500/50 text-red-100"
          }`}
        >
          {notification.type === "success" ? (
            <Check size={20} className="flex-shrink-0" />
          ) : (
            <X size={20} className="flex-shrink-0" />
          )}
          <span>{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="ml-2 text-white/70 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Pi Box</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <a
              href="#"
              className="text-purple-300 hover:text-white transition-colors border-b-2 border-purple-500 px-1 pb-1"
            >
              Overview
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors px-1 pb-1">
              Key Features
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors px-1 pb-1">
              Get Pi Box Now
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Product Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 rounded-3xl p-6 sm:p-8 backdrop-blur-sm border border-purple-500/20 shadow-2xl">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
                  <div className="w-full max-w-xs mx-auto aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex flex-col items-center justify-center shadow-lg p-4">
                    <div className="w-full max-w-[160px] h-24 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-lg tracking-wider">
                        Pi BOX
                      </span>
                    </div>
                    <div className="flex justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-400"></div>
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">
                      Developer Edition
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                Pi Box Basic
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
                Revolutionary computing made simple
              </p>
            </div>

            {/* What's Inside */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4 sm:mb-6">
                What's Inside:
              </h2>
              <div className="grid gap-3 sm:gap-4">
                {[
                  { icon: Cpu, text: "Core Pi Box device" },
                  { icon: Cable, text: "Essential Cables & Power Adapter" },
                  { icon: Mouse, text: "Input Devices (Mouse, Keyboard)" },
                  {
                    icon: Monitor,
                    text: "Compatible with all Projectors, Monitors & TV's",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 sm:p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
                    </div>
                    <span className="text-gray-200 text-sm sm:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Ons */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4 sm:mb-6">
                Add Ons:
              </h2>
              <div className="grid gap-3 sm:gap-4">
                {addOns.map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-xl backdrop-blur-sm border cursor-pointer transition-all duration-300 ${
                      selectedAddOns.find((item) => item.id === addon.id)
                        ? "bg-purple-500/20 border-purple-500/60 shadow-lg"
                        : "bg-white/5 border-purple-500/20 hover:border-purple-500/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedAddOns.find((item) => item.id === addon.id)
                            ? "bg-purple-500/30"
                            : "bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
                        }`}
                      >
                        <addon.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
                      </div>
                      <div>
                        <div className="text-gray-200 font-medium text-sm sm:text-base">
                          {addon.name}
                        </div>
                        {addon.subtitle && (
                          <div className="text-xs sm:text-sm text-gray-400">
                            {addon.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-purple-300 font-semibold text-sm sm:text-base">
                      +${addon.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price and Buy Button */}
            <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-purple-500/20">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-gray-300 text-base sm:text-lg">Total Price:</span>
                <div className="flex items-baseline gap-2">
                  {selectedAddOns.length > 0 && (
                    <span className="text-gray-400 text-sm line-through">
                      ${basePrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl sm:text-3xl font-bold text-purple-300">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsFormVisible(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl p-6 w-full max-w-md border border-purple-500/20 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-300">
                Checkout Details
              </h2>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.fullName ? "border-red-500" : "border-purple-500/20 focus:border-purple-500/60"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                  Email ID *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.email ? "border-red-500" : "border-purple-500/20 focus:border-purple-500/60"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm text-gray-300 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="1234567890"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.mobile ? "border-red-500" : "border-purple-500/20 focus:border-purple-500/60"
                  }`}
                />
                {errors.mobile && (
                  <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm text-gray-300 mb-1">
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="123 Main St, City, Country"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors h-24 resize-none ${
                    errors.address ? "border-red-500" : "border-purple-500/20 focus:border-purple-500/60"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <p className="block text-sm text-gray-300 mb-2">Gender</p>
                <div className="flex gap-4">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, gender: "male" }))
                    }
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.gender === "male"
                          ? "border-purple-500"
                          : "border-gray-400"
                      }`}
                    >
                      {formData.gender === "male" && (
                        <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-300">Male</span>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, gender: "female" }))
                    }
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.gender === "female"
                          ? "border-purple-500"
                          : "border-gray-400"
                      }`}
                    >
                      {formData.gender === "female" && (
                        <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-300">Female</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Confirm Purchase - $${totalPrice.toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
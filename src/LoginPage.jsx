import React, { useState } from "react";
import { INDIAN_STATES } from "./constants/states";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const LoginPage = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    state: "",
    district: ""
  });

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Please enter a valid email";
    
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!form.state) newErrors.state = "State is required";
    if (!form.district) newErrors.district = "District is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      await onLogin(form);
    } catch (error) {
      setErrors({ submit: error.message || "Failed to log in. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">DisasterAI</h1>
          <p className="text-white/70">Weather & Disaster Monitoring Platform</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Location Details</h2>
            <p className="text-white/60 text-sm">Select your location to monitor weather and receive alerts</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white mb-1 text-sm font-medium">State</label>
              <select 
                name="state" 
                value={form.state} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              >
                <option value="" className="text-gray-900">Select State</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state} className="text-gray-900">{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-sm text-red-400">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="block text-white mb-1 text-sm font-medium">District</label>
              <input 
                type="text" 
                name="district" 
                value={form.district} 
                onChange={handleChange} 
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 ${errors.district ? 'border-red-400' : 'border-white/20'}`}
                placeholder="Enter your district"
                required 
              />
              {errors.district && (
                <p className="mt-1 text-sm text-red-400">{errors.district}</p>
              )}
            </div>

            <div>
              <label className="block text-white mb-1 text-sm font-medium">Email</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 ${errors.email ? 'border-red-400' : 'border-white/20'}`}
                placeholder="Enter your email"
                required 
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-white mb-1 text-sm font-medium">Password</label>
              <input 
                type="password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 ${errors.password ? 'border-red-400' : 'border-white/20'}`}
                placeholder="Enter your password"
                required 
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={6}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400 text-center">{errors.submit}</p>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Processing...</span>
              </span>
            ) : (
              isSignup ? "Create Account" : "Continue"
            )}
          </button>

          <p className="text-center text-sm text-white/70 hover:text-white cursor-pointer transition" onClick={() => {
            setIsSignup(!isSignup);
            setForm({
              email: "",
              password: "",
              state: "",
              district: ""
            });
            setErrors({});
          }}>
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

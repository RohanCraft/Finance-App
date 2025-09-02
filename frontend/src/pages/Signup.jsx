import React, { useRef, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const API_URL =
    "https://finance-app-backend-e0xc.onrender.com/api/auth/signup";

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }

    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Top Gradient */}
      <div className="flex md:hidden w-full bg-gradient-to-tr from-blue-500 to-blue-700 items-center justify-center py-10">
        <div className="text-white text-center px-4">
          <h1 className="text-3xl font-extrabold mb-2">Join Us!</h1>
          <p className="text-base">
            Create your account and start managing your finances.
          </p>
        </div>
      </div>

      {/* Desktop Gradient */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 items-center justify-center">
        <div className="text-white text-center px-8">
          <h1 className="text-4xl font-extrabold mb-4">Join Us!</h1>
          <p className="text-lg">
            Create your account and start managing your finances.
          </p>
        </div>
      </div>

      {/* Form */}
      <div
        className={`flex w-full md:w-1/2 items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-700">
            Create Account
          </h2>
          <p className="text-sm text-center text-gray-500">
            Start your journey with us
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                ref={nameRef}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                ref={emailRef}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md hover:scale-105 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 text-sm sm:text-base font-medium"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Signup;

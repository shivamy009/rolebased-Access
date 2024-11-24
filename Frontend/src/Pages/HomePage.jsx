import React from "react";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { GiStarSwirl } from "react-icons/gi";
import uranus from "../assets/uranus.gif"
import side from "../assets/side.gif"

const Homepage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={side} // Replace with your GIF link
          alt="Animated Bars"
          className="w-3/4"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex items-center justify-center shadow-md">
        <div className="w-2/3">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 flex items-center justify-center">
              <span className="text-black font-bold text-xl"><img src={uranus} alt=""  /></span>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back!
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Please enter your details
          </p>

          {/* Form */}
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-sm text-gray-600 block mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="text-sm text-gray-600 block mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <span className="absolute right-4 top-10 text-gray-400 cursor-pointer">
                👁️
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember for 30 days
                </label>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg mb-4 hover:bg-gray-800">
              Log In
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-gray-100 py-3 rounded-lg border hover:bg-gray-200"
            >
              <FcGoogle className="mr-2 text-xl" />
              Log in with Google
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

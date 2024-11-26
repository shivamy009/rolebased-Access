import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import uranus from "../assets/uranus.gif";
import side from "../assets/side.gif";
import {Toaster,toast} from "react-hot-toast"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from "../features/userSlice";
// import { setUser } from './features/user/userSlice';


const Homepage = () => {
  const [role, setRole] = useState("user"); // State to manage selected role
  const [email, setEmail] = useState(""); // State to manage selected role
  const [password, setPassword] = useState(""); // State to manage selected role
  let navigate=useNavigate();
  const dispatch = useDispatch();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    // let serverRoute=type=="sign-in" ? "/signin" :"/signup"

    if(!email.length){
       return toast.error("Enter your email")
    }
    await axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/auth/signin",{
      role:role,
      email:email,
      password:password
      // formData,
     }).then(({data})=>{
      console.log(data)
      // console.log(sessionStorage)
      // localStorage.setItem('userdata',data)
      toast.success(data.message)
      dispatch(setUser(data.sendData));
      const token = "some-access-token"; // Replace with actual token logic
       localStorage.setItem("access_token", data.sendData.access_token);
       dispatch(setAccessToken(data.sendData.access_token));
      if(data.sendData.role==='user'){
        navigate('/')
      }else{
        
        navigate('/home-admin')
      }
      return;
      
     })
     .catch(err=>{
      console.log(err)
      return toast.error(err.response.data.message)
      console.log("first")
     })
    
 }

  return (
    <div className="flex h-screen ">
      <Toaster/>
      {/* Left Section */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={side}
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
              <span className="text-black font-bold text-xl">
                <img src={uranus} alt="" />
              </span>
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
            {/* Email Field */}
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
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
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
                onChange={(e)=>setPassword(e.target.value)}
              />
              <span className="absolute right-4 top-10 text-gray-400 cursor-pointer">
                👁️
              </span>
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-2">
                Log in as:
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  User
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  Admin
                </label>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
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

            {/* Buttons */}
            <button className="w-full bg-black text-white py-3 rounded-lg mb-4 hover:bg-gray-800" onClick={(e)=>handleSubmit(e)}>
              Log In
            </button>

            {/* <button
              type="button"
              className="w-full flex items-center justify-center bg-gray-100 py-3 rounded-lg border hover:bg-gray-200"
            >
              <FcGoogle className="mr-2 text-xl" />
              Log in with Google
            </button> */}
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

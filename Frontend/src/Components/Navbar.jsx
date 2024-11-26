import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // For redirecting
// import { logout } from "../redux/actions"; // Assuming you have a logout action

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const AdminName = userData?.userData?.fullname;
  const image = userData?.userData?.profile_img;

  const accessToken = userData?.access_token; // Get the access token from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear user data from Redux and local storage or any other state management
    // dispatch(logout()); // Dispatch logout action
    localStorage.clear(); // Remove token from localStorage

    // Redirect user to the home page (or login page)
    navigate("/"); // This redirects to the homepage (or login page)
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 fixed w-full flex items-center justify-between z-10">
      <div className="flex items-center space-x-4">
        <img
          src={image} // Profile image
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-xl font-bold text-gray-700">Hello! {AdminName}</h1>
      </div>
      
      {/* Conditionally render the Logout button */}
      {accessToken && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Navbar;

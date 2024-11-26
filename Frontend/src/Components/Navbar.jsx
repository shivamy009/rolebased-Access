import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const AdminNAme = userData?.userData?.fullname;
  const image = userData?.userData?.profile_img;
  return (
    <header className="bg-white shadow-md py-4 px-6 fixed w-full flex items-center justify-between z-10">
      <div className="flex items-center space-x-4">
        <img
          src={image} // Replace with a dynamic URL
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-xl font-bold text-gray-700">Hello ! {AdminNAme}</h1>
      </div>
    </header>
  );
};

export default Navbar;

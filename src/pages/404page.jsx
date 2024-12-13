// NotFound.jsx
import React from "react";
import powerpuffGirlsImage from "../assets/pngaaa.com-257734.png"; // Relative path
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='bg-background flex p-3 items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center w-fit justify-center text-center'>
        <img src={powerpuffGirlsImage} alt='404 Page Image' className='' />
        <div className='flex flex-col  max-w-[80%] gap-2 items-center justify-center'>
          <h1 className='font-extrabold text-7xl text-text-primary'>404</h1>
          <p className=''>
            The page you requested doesn't exist or has been moved.{" "}
            <NavLink
              href='/'
              className=' text-button-bg hover:text-button-hover hover:underline'
            >
              Go back to Home
            </NavLink>
             or use the navigation menu to find what you need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

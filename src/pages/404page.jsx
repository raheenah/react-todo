import React from "react";
import powerpuffGirlsImage from "../assets/404.png";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='bg-background flex p-3 items-center justify-center min-h-screen'>
      <div className='flex flex-col mt-20 items-center w-fit justify-center text-center'>
        <img src={powerpuffGirlsImage} alt='404 Page Image' className='h-40' />
        <div className='flex flex-col  max-w-[80%] gap-2 items-center justify-center'>
          <h1 className='font-extrabold text-7xl text-text-primary'>404</h1>
          <p className=''>
            The page you requested doesn't exist or has been moved.{" "}
            <NavLink
              to='/'
              className=' text-button-bg hover:text-button-hover hover:underline'
            >
              Go back to Home
            </NavLink>
            &nbsp;or use the navigation menu to find what you need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

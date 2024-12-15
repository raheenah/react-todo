import React from "react";
import powerpuffGirlsImage from "../assets/pngaaa.com-257756.png"; 
import { NavLink } from "react-router-dom";

const ErrorTest = () => {
  return (
    <div className='bg-background flex p-3 items-center justify-center min-h-screen'>
      <div className='flex mt-20 flex-col items-center w-fit justify-center text-center'>
        <img
          src={powerpuffGirlsImage}
          alt='Error Boundary Page Image'
          className='h-40'
        />
        <div className='flex flex-col mt-5  max-w-[80%] gap-2 items-center justify-center'>
          <h1 className='font-extrabold text-xl text-text-primary'>
            Uh-oh, something went wrong!
          </h1>
          <p>
            It seems something's broken, review the code one more time to find
            the villian.
          </p>
          <div className='flex gap-5  items-center'>
            <button
              onClick={() => window.location.reload()}
              className='bg-button-bg hover:bg-button-hover text-text-primary font-bold px-4 py-2 rounded-lg'
            >
              Refresh Page
            </button>
            <NavLink
              to='/'
              className=' text-button-bg hover:text-button-hover hover:underline'
            >
              Go to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorTest;

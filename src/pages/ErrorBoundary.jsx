// NotFound.jsx
import React from "react";
import powerpuffGirlsImage from "../assets/pngaaa.com-257756.png"; // Relative path
import { NavLink } from "react-router-dom";

const ErrorTest = () => {
  return (
    <div className='bg-background flex p-3 items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center w-fit justify-center text-center'>
        <img
          src={powerpuffGirlsImage}
          alt='Error Boundary Test Page Image'
          className='h-48'
        />
        <div className='flex flex-col mt-5  max-w-[80%] gap-2 items-center justify-center'>
          <h1 className='font-extrabold text-xl text-text-primary'>
            Uh-oh, something went wrong!
          </h1>
          <p>It seems something's broken</p>
          <div className='flex gap-5 mt-5 items-center'>
            <button
              onClick={() => window.location.reload()}
              className='bg-button-bg hover:bg-button-hover text-text-primary font-bold px-4 py-2 rounded-lg'
            >
              Refresh Page
            </button>
            <a
              href='/'
              className=' text-button-bg hover:text-button-hover hover:underline'
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorTest;

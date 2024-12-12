// src/components/Loader.js
import React from "react";
import powerpuffGirlsImage from '../assets/powerpuff-girls-9.svg';  // Relative path

const Loader = () => {
  return (
    <div className='bg-background flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <div className='pulse w-28 h-28  mx-auto'>
                  <img src={powerpuffGirlsImage} alt='Loader Image' />
                  <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;

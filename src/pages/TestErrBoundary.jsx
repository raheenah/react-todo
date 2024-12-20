import { useEffect, useState } from "react";
import powerpuffGirlsImage from "../assets/bubbles.png";


const TestErrBoundary = () => {
  const [throwError, setThrowError] = useState(false)
  
  if (throwError) {
    throw new Error("You never listen");
    
  }
  
 

//   const HandleClick = () => {
//  useEffect(() => {
//    throw new Error("An error occured")
//  });
      
//   };
    

  return (
    <div className='bg-background flex p-3 items-center justify-center min-h-screen'>
      <div className='flex mt-20 flex-col items-center w-fit justify-center gap-4 text-center'>
        <img
          src={powerpuffGirlsImage}
          alt='Error Boundary Page Image'
          className='h-40'
        />
        <h1 className='font-extrabold text-2xl text-text-primary'>
          Don't click the button
        </h1>
        <button
          role='button'
          onClick={()=>setThrowError(true)} 
          aria-label='Throw an error'
          className='bg-button-bg hover:bg-button-hover text-text-primary font-bold px-4 py-2 rounded-lg'
        >
          Throw an Error
        </button>
      </div>
      
    </div>
  );
};

export default TestErrBoundary;

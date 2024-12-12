import React from "react";

const ReadmeSection = ({ readme }) => {
  return (
    <div className='mt-8'>
      <h3 className='text-xl font-semibold'>README</h3>
      <div className='mt-4'>
        <pre className='bg-pink-300 p-4 rounded'>
          {readme || "Loading README..."}
        </pre>
      </div>
    </div>
  );
};

export default ReadmeSection;

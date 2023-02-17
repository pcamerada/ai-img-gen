import React, { useState } from 'react';

const ImagePopup = ({ image, title, closePopup }) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800
        bg-opacity-80 flex justify-center items-center z-50"
        onClick={closePopup}>
        <button className="absolute top-0 right-5 text-white text-6xl" onClick={closePopup}>
            &times;
        </button>
        <div className="relative p-3 flex justify-center
            items-center xl:max-w-[50%] lg:max-w-[70%] md:max-w-[90%]">
        <img src={image} alt={title} className='w-full h-full rounded-2xl object-contain'/>
        </div>
    </div>
  );
};

export default ImagePopup;
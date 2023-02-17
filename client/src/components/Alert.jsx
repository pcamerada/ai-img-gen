import React, { useEffect } from 'react';
import { useStateContext } from '../context/ContextProvider';

const Alert = () => {

    const { alert, closeAlert, showAlert } = useStateContext();    

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            closeAlert();
        }, 5000);
    
        return () => clearTimeout(timeoutId);
    });

    const getColorClass = () => {
        switch (alert.type) {
          case 'success':
            return 'bg-green-500';
          case 'info':
            return 'bg-blue-500';
          case 'warning':
            return 'bg-yellow-500';
          case 'error':
            return 'bg-red-500';
          default:
            return 'bg-blue-500';
        }
    };

  return (
    <>
        { showAlert && (
            <div
                className='fixed top-0 left-0 w-full
                    text-white opacity-80 mt-12 px-5'
                >
                    <div className={`flex rounded-lg justify-between h-12 px-4 py-2 ${getColorClass()}`}>
                        <div className='text-center w-full'>{alert.message}</div>
                        <button onClick={closeAlert}>X</button>
                    </div>

            </div>
        )}
    </>
  )
}

export default Alert
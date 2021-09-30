import React from 'react';
import './spinnerStyles.css';
const LoadingSpinner = () => {
  return (
    <div className='loaderWrapper'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

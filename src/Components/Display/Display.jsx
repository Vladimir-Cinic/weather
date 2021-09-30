import React from 'react';
import Calendar from '../Calendar/Calendar';
import { GoLocation } from 'react-icons/go';
import './displayStyle.css';
import { useGlobalContext } from '../../Context';
const Display = () => {
  const { weatherData, errorMsg } = useGlobalContext();
  const { name, main, weather } = weatherData;
  if (weatherData === undefined || weatherData === '' || errorMsg) {
    return <p className='error-message'>{errorMsg}</p>;
  } else {
    return (
      <article className='data-wrapper'>
        <h3 className='city'>
          {name}
          <GoLocation
            style={{
              color: 'inherit',
              fontSize: '1.4rem',
              marginLeft: '.2rem',
            }}
          />
        </h3>
        <Calendar />

        <h1 className='main-temperature'>
          {Math.round(main.temp)}&#176;<span>c</span>
        </h1>
        <div className='details-wrapper'>
          <div className='image-container'>
            <img
              src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt=''
            />
          </div>
          <span className='weather-type'>{weather[0].main} </span>

          <span>
            {' '}
            {Math.round(main.temp_max)}&#176; / {Math.round(main.temp_min)}
            &#176;
          </span>
        </div>
      </article>
    );
  }
};

export default Display;
// {
//   weatherData === '' || errorMsg ? (
//     <p className='error-message'>{errorMsg}</p>
//   ) : (
//     <Display {...weatherData} />
//   );
// }

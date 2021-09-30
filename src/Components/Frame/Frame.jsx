import React, { useEffect, useRef } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Display from '../Display/Display';
import SearchHistory from '../SearchHistory/HistoryList/HistoryList';
import './frameStyles.css';
import { useGlobalContext } from '../../Context';
import RainVideo from '../../Assets/Videos/rainVideo.mp4';
import SunVideo from '../../Assets/Videos/sunVideo.mp4';
import CloudVideo from '../../Assets/Videos/cloudVideo.mp4';
import StormVideo from '../../Assets/Videos/stormVideo.mp4';
import SnowVideo from '../../Assets/Videos/snowVideo.mp4';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Frame = () => {
  const videoBackground = useRef(null);
  const { weatherType, isLoading, errorMsg, weatherData } = useGlobalContext();

  useEffect(() => {
    const playPromise = videoBackground.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [weatherType]);

  const typeOfWeather = () => {
    if (weatherType === 'Thunderstorm') {
      return StormVideo;
    } else if (weatherType === 'Drizzle') {
      return RainVideo;
    } else if (weatherType === 'Drizzle' || weatherType === 'Rain') {
      return RainVideo;
    } else if (weatherType === 'Snow') {
      return SnowVideo;
    } else if (weatherType === 'Clear') {
      return SunVideo;
    } else if (weatherType === 'Clouds') {
      return CloudVideo;
    } else {
      return '';
    }
  };

  return (
    <div className='frame'>
      <div
        className={`video-container ${
          isLoading ||
          weatherData === undefined ||
          errorMsg ||
          weatherData === '' ||
          errorMsg
            ? ''
            : 'show-video'
        }`}
      >
        <video
          ref={videoBackground}
          className='video'
          type='video/mp4'
          muted
          src={typeOfWeather()}
          alt='background-video'
          loop
          playsInline
          autoPlay={false}
          controls={false}
          preload='auto'
        />
      </div>
      <div className='display'>
        {isLoading && <LoadingSpinner />}
        {!isLoading && <Display />}
      </div>
      <SearchForm />
      <SearchHistory />
    </div>
  );
};

export default Frame;

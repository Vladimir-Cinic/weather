import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const getHistory = () => {
  let localStorageHistory = localStorage.getItem('history');
  if (!localStorageHistory) {
    localStorageHistory = [];
    return localStorageHistory;
  }
  return JSON.parse(localStorageHistory);
};

const AppProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState('');
  const [searchHistory, setSearchHistory] = useState(getHistory());
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [weatherType, setWeatherType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // GET USERS LOCATION
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };
  useEffect(() => {
    getLocation();
  }, []);
  // GET USERS LOCATION

  // USER LOCATION HTTP REQUEST
  useEffect(async () => {
    if (latitude && longitude) {
      try {
        startLoading();
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        );
        setWeatherData(data);
      } catch (error) {
        setErrorMsg(
          `Oooops...there was a problem Error (${error.response.status})`
        );
        console.log(error);
        setWeatherData('');
      }
    }
  }, [latitude, longitude]);
  // USER LOCATION HTTP REQUEST

  // SPINNER CONTROL
  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  // SPINNER CONTROL

  // HTTP REQUEST
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city === '' || city === undefined) {
      setErrorMsg('');
      startLoading();
      setErrorMsg('Enter the name of the city in a search bar.');
      return;
    }
    if (!isNaN(city)) {
      setErrorMsg('');
      startLoading();
      setErrorMsg('Please provide the valid input');
      return;
    }
    setErrorMsg('');
    try {
      startLoading();
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(data);
      setCity('');
    } catch (error) {
      if (error.response) {
        setIsLoading(false);
        setErrorMsg(
          `There was no match for your search criteria... Error ( ${error.response.status} item not found.)`
        );
        setWeatherData('');
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        setIsLoading(false);
        console.log('Error', error.message);
      }
      console.log(error);
      setIsLoading(false);
    }
  };
  // HTTP REQUEST

  // HANDLE SEARCH HISTORY
  useEffect(() => {
    if (weatherData) {
      if (searchHistory.length >= 10) {
        searchHistory.pop();
      }
      setWeatherType(weatherData.weather[0].main);
      setSearchHistory([
        {
          id: (weatherData.id * Math.random()) / Math.random(),
          name: weatherData.name,
          temperature: Math.round(weatherData.main.temp),
          iconUrl: weatherData.weather[0].icon,nn
          date: `${month.substring(0, 3)} ${date}. ${year}`,
        },
        ...searchHistory,
      ]);
    }
    // eslint-disable-next-line
  }, [weatherData]);
  // HANDLE SEARCH HISTORY

  // ADD TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(searchHistory));
    // eslint-disable-next-line
  }, [searchHistory]);
  // ADD TO LOCAL STORAGE

  // HANDLE DELETE HISTORY
  const handleDeleteHistory = (id) => {
    const clickedItem = searchHistory.find((item) => item.id === id);
    setSearchHistory(
      searchHistory.filter((item) => item.id !== clickedItem.id)
    );
  };
  // HANDLE DELETE HISTORY

  // HANDLE CLEAR HISTORY
  const handleClearHistory = () => {
    setSearchHistory([]);
  };
  // HANDLE CLEAR HISTORY

  // CALENDAR DATA
  const d = new Date();
  const weekDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'Jun',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = weekDay[d.getDay()];
  const month = months[d.getMonth()];
  const date = d.getDate();
  const year = d.getFullYear();
  // CALENDAR DATA
  return (
    <AppContext.Provider
      value={{
        months,
        day,
        month,
        date,
        year,
        weatherData,
        setWeatherData,
        searchHistory,
        setSearchHistory,
        city,
        setCity,
        handleSubmit,
        handleDeleteHistory,
        errorMsg,
        handleClearHistory,
        weatherType,
        setWeatherType,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

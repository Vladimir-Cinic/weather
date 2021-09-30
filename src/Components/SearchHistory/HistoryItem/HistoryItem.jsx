import React from 'react';
import './item.css';
import { BsTrash } from 'react-icons/bs';
import { useGlobalContext } from '../../../Context';
const HistoryItem = ({ name, iconUrl, temperature, date, id }) => {
  const { handleDeleteHistory } = useGlobalContext();
  return (
    <li className='item'>
      <p>{name}</p>
      <div className='icon-wrapper'>
        <p>{temperature} &#176;</p>
        <div className='img-container'>
          <img
            src={`http://openweathermap.org/img/wn/${iconUrl}@2x.png`}
            alt=''
          />
        </div>
      </div>
      <p>{date}</p>
      <BsTrash
        className='delete-icon'
        onClick={() => handleDeleteHistory(id)}
      />
    </li>
  );
};

export default HistoryItem;

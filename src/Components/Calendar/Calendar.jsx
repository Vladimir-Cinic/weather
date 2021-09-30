import React from 'react';
import { useGlobalContext } from '../../Context';

const Calendar = () => {
  const { day, month, date, year } = useGlobalContext();
  return (
    <article className='calendar'>
      <span>{day},</span>
      <span>{date}</span>
      <span>{month},</span>
      <span>{year}</span>
    </article>
  );
};

export default Calendar;

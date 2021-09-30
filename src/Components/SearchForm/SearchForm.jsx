import React from 'react';
import { useGlobalContext } from '../../Context';

const SearchForm = () => {
  const { handleSubmit, city, setCity } = useGlobalContext();
  return (
    <form onSubmit={handleSubmit}>
      <input
        className='input'
        type='text'
        value={city}
        placeholder='Search...'
        onChange={(e) => setCity(e.target.value)}
      />
      <input type='submit' className='btn' />
    </form>
  );
};

export default SearchForm;

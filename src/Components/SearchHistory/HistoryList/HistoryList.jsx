import React from 'react';
import { useGlobalContext } from '../../../Context';
import HistoryItem from '../HistoryItem/HistoryItem';
import './listStyle.css';

const HistoryList = () => {
  const { searchHistory, handleClearHistory } = useGlobalContext();
  return (
    <article className='history-wrapper'>
      {!searchHistory.length ? null : (
        <button className='clear-btn' onClick={handleClearHistory}>
          Clear History
        </button>
      )}

      <ul
        className={`history-list ${
          searchHistory.length > 5 ? `add-scroll` : ''
        }`}
      >
        {searchHistory.length !== 0 &&
          searchHistory.map((item) => {
            return <HistoryItem key={item.id} {...item} />;
          })}
      </ul>
    </article>
  );
};

export default HistoryList;

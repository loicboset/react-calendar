import React from 'react';

const DateHeader = ({ daysRange }) => {

  return (
    <div className='flex'>
      {daysRange.map(date => {
        const formatedDate = `${date.day}/${date.month}`;
        return (
          <div key={formatedDate} style={{ flex: '0 0 40px', height: '40px' }} className='day  text-red-500'>{formatedDate}</div>
        )
      })}
    </div>
  );
};

export default DateHeader;
import React, { useEffect } from 'react';

const DateHeader = ({ daysRange }) => {

  useEffect(() => {
    const today = document.querySelector('#date-20-2-2021');
    if (today) {
      today.scrollIntoView({inline: "start"});
    };
  }, [daysRange]);

  return (
    <div className='flex'>
      {daysRange.map(date => {
        const formatedDate = `${date.day}/${date.month}`;
        return (
          <div
            key={formatedDate}
            id={`date-${date.day}-${date.month}-${date.year}`}
            style={{ flex: '0 0 40px', height: '40px' }}
            className='day  text-red-500'
          >
            {formatedDate}
          </div>
        )
      })}
    </div>
  );
};

export default DateHeader;
import React, { useRef, useCallback } from 'react';

const DateHeader = ({ daysRange }) => {

  // TODO: this code makes the view jumpy when today's date
  // appears again in the DOM ==> investigate why and how to do differently
  const todayRef = useCallback(node => {
    console.log('useCallback');
    if (node !== null) {
      console.log('scrollIntoView');
      node.scrollIntoView({
        inline: 'start'
      });
    }
  }, []);

  return (
    <>
      <div className='flex'>
          {daysRange.map(date => {
            const formatedDate = `${date.day}/${date.month}`;
            const today = new Date();
            const isToday = today.getDate() === date.day && today.getMonth() + 1 === date.month && today.getFullYear() === date.year;
            return (
              <div
                key={formatedDate}
                id={`date-${date.day}-${date.month}-${date.year}`}
                style={{ flex: '0 0 40px', height: '40px' }}
                className='day  text-red-500'
                ref={isToday ? todayRef : null}
              >
                {formatedDate}
              </div>
            )
          })}
      </div>
    </>
  );
};

export default DateHeader;
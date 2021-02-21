import React, { useEffect, useState, useRef, useCallback } from 'react';

const DateHeader = ({ daysRange }) => {

  const activeDayRef = useRef(null);
  // const [months, setMonths]= useState([
  //   // {'01-2021': {days: 11}}
  // ])

  const measuredRef = useCallback(node => {
    if (node !== null) {
      node.scrollIntoView({
        inline: 'start'
      });
    }
  }, []);

  useEffect(() => {
    // const monthsArray = [];
    // daysRange.map(day => {
    //   const monthYear = `${day.month}-${day.year}`;
    //   if (monthsArray.hasOwnProperty(monthYear)) {
    //     monthsArray[monthYear]['days'] += 1;
    //   } else {
    //     monthsArray[monthYear] = {days: 1};
    //   };
    // })
    // console.log('monthsArray', monthsArray);
    // setMonths(monthsArray);
  }, []);

  return (
    <>
      {/* <div id='months-header' className='flex'>
        {months.map(month => {
          console.log('month', month);
          const days = Object.values(month)[0].days;
          const spanWidth = `${days * 40}px`;
          const id = Object.keys(month)[0];
          console.log('days', days);
          console.log('spanWidth', spanWidth);
          return (
            <div key={id} className='bg-blue-100' style={{ width: spanWidth}}>
              {id}
            </div>
          )
        })}
      </div> */}
      <div className='flex'>
          {daysRange.map(date => {
            const formatedDate = `${date.day}/${date.month}`;
            // ref={i === activeSlide ? activeSlideRef : null}
            const today = new Date();
            const isToday = today.getDate() === date.day && today.getMonth() + 1 === date.month && today.getFullYear() === date.year;
            // console.log('today.getDate', today.getDate, 'date.day', date.day);
            return (
              <div
                key={formatedDate}
                id={`date-${date.day}-${date.month}-${date.year}`}
                style={{ flex: '0 0 40px', height: '40px' }}
                className='day  text-red-500'
                ref={isToday ? measuredRef : null}
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
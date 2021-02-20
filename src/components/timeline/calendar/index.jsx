import React, { useEffect, useState } from 'react';
import { create9WeeksFrame } from './utils';

const Calendar = ({ groups }) => {

  const [daysRange, setDaysRange] = useState([]);

  useEffect(() => {
    setDaysRange(create9WeeksFrame().map(date => ( {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()} )));

    const calendarContainer = document.querySelector('#calendar');
    if (calendarContainer) {
      calendarContainer.onscroll = function () {
        if (calendarContainer.scrollWidth - 100 <= calendarContainer.clientWidth + calendarContainer.scrollLeft) {
          setDaysRange(range => {
            const rangeLength = range.length
            const lastDay = range[rangeLength - 1];
            let dates = [];
            let currentDay = new Date(`${lastDay.month + 1}-${lastDay.day}-${lastDay.year}`);
            for (let i = 0; i < 31; i++) {
              const nextDate = new Date(currentDay.setDate(currentDay.getDate() + 1));
              dates.push(nextDate)
            };
            const formatedDates = dates.map(date => ( {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()} ));
            return [...range, ...formatedDates];
          });
        };
      };
    };
  }, []);

  return (
    <div id='calendar' className='overflow-scroll border border-red flex-grow'>
      <div className='flex'>
        {daysRange.map(date => {
          const formatedDate = `${date.day}/${date.month}`;
          return (
            <div key={formatedDate} style={{ flex: '0 0 40px', height: '40px' }} className='day  text-red-500'>{formatedDate}</div>
          )
        })}
      </div>
      {groups.map(group => {
        return (
          <div key={group} id={`row-group-${group}`} className='flex'>
            {daysRange.map(date => {
              const formatedDate = `${date.day}/${date.month}`;
              return (
                <div key={formatedDate} id={`elem-${group}-${date.day}`} style={{ flex: '0 0 40px', height: '40px' }} className=' relative'></div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
};

export default Calendar;
import React, { useEffect, useState } from 'react';
import DateHeader from './DateHeader';
import DateRow from './DateRow';
import { create9WeeksFrame, getFutureDays, getPastDays } from './utils';

const Calendar = ({ groups, items, daysRange, setDaysRange }) => {

  // const [daysRange, setDaysRange] = useState([]);
  const [scrollLeftDay, setScrollLeftDay] = useState(new Date());

  useEffect(() => {
    // RIGHT SCROLLING
    const targetEnd = daysRange[daysRange.length - 5];
    if (targetEnd) {
      const dateElement = document.querySelector(`#date-${targetEnd.day}-${targetEnd.month}-${targetEnd.year}`);
      let options = {
        root: document.querySelector('#calendar'),
        rootMargin: '0px',
        threshold: 1.0
      };
      let callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const calendarContainer = document.querySelector('#calendar');
            getFutureDays(setDaysRange, calendarContainer);
          };
        })
      };
      let observer = new IntersectionObserver(callback, options);
      let target = dateElement;
      observer.observe(target);
    };

    // LEFT SCROLLING
    const targetStart = daysRange[5];
    if (targetStart) {
      const dateElement = document.querySelector(`#date-${targetStart.day}-${targetStart.month}-${targetStart.year}`);
      let options = {
        root: document.querySelector('#calendar'),
        rootMargin: '0px',
        threshold: 1.0
      };
      let callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const calendarContainer = document.querySelector('#calendar');
            getPastDays(setDaysRange, calendarContainer);
          };
        })
      };
      let observer = new IntersectionObserver(callback, options);
      let target = dateElement;
      observer.observe(target);
    };

  }, [daysRange]);

  useEffect(() => {
    setDaysRange(create9WeeksFrame().map(date => {
      return {
        time: date.getTime(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    }));
  }, []);

  return (
    <div id='calendar' className='overflow-scroll border border-red flex-grow'>
      <DateHeader daysRange={daysRange} scrollLeftDay={scrollLeftDay} />
      {groups.map((group, index) => {
        const groupItems = items.filter(item => item.group === index);
        return (
          <DateRow key={group.id} daysRange={daysRange} group={group} items={groupItems} />
        )
      })}
    </div>
  );
};

export default Calendar;
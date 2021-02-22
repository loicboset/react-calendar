import React, { useEffect, useState } from 'react';
import DateHeader from './DateHeader';
import DateRow from './DateRow';
import { create9WeeksFrame } from './utils';

const Calendar = ({ groups, items }) => {

  const [daysRange, setDaysRange] = useState([]);
  const [scrollLeftDay, setScrollLeftDay] = useState(new Date());
  const [targetDay, setTargetDay] = useState(0);

  useEffect(() => {
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
            setTargetDay(targetEnd);
          };
        })
      };
      let observer = new IntersectionObserver(callback, options);
      let target = dateElement;
      observer.observe(target);
    };
  }, [daysRange]);

  useEffect(() => {
    setDaysRange(range => {
      if (range.length === 0) return range;
      const rangeLength = range.length;
      const lastDay = range[rangeLength - 1];
      let dates = [];
      let currentDay = new Date(`${lastDay.month}-${lastDay.day}-${lastDay.year}`);
      for (let i = 0; i < 10; i++) {
        const nextDate = new Date(currentDay.setDate(currentDay.getDate() + 1));
        dates.push(nextDate)
      };
      const formatedDates = dates.map(date => {
        return {
          time: date.getTime(),
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      })
      // const slicedRange = range.splice(0, 31);
      const sortedDays = [...range, ...formatedDates].sort((a, b) => a.time - b.time);
      return [...sortedDays];
    });
  }, [targetDay]);

  useEffect(() => {
    setDaysRange(create9WeeksFrame().map(date => {
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        itemAttached: undefined,
      };
    }));

    // const calendarContainer = document.querySelector('#calendar');
    // if (calendarContainer) {
    //   calendarContainer.onscroll = function () {

    //     if (calendarContainer.scrollWidth - 100 <= calendarContainer.clientWidth + calendarContainer.scrollLeft) {
    //       setDaysRange(range => {
    //         const rangeLength = range.length;
    //         const lastDay = range[rangeLength - 1];
    //         let dates = [];
    //         let currentDay = new Date(`${lastDay.month}-${lastDay.day}-${lastDay.year}`);
    //         for (let i = 0; i < 31; i++) {
    //           const nextDate = new Date(currentDay.setDate(currentDay.getDate() + 1));
    //           dates.push(nextDate)
    //         };
    //         const formatedDates = dates.map(date => {
    //           return {
    //             time: date.getTime(),
    //             day: date.getDate(),
    //             month: date.getMonth() + 1,
    //             year: date.getFullYear(),
    //           };
    //         })
    //         const slicedRange = range.splice(0, 31);
    //         const sortedDays = [...slicedRange, ...formatedDates].sort((a, b) => a.time - b.time);
    //         return [...sortedDays];
    //       });
    //     } else if (calendarContainer.scrollLeft <= 100 && calendarContainer.scrollLeft !== 0 ) {
    //       setDaysRange(range => {
    //         const firstDay = range[0];
    //         let dates = [];
    //         let currentDay = new Date(`${firstDay.month}-${firstDay.day}-${firstDay.year}`);
    //         console.log('setting left day', currentDay);
    //         setScrollLeftDay(currentDay);
    //         for (let i = 0; i < 31; i++) {
    //           const previousDate = new Date(currentDay.setDate(currentDay.getDate() - 1));
    //           dates.push(previousDate);
    //         };
    //         const formatedDates = dates.map(date => {
    //           return {
    //             time: date.getTime(),
    //             day: date.getDate(),
    //             month: date.getMonth() + 1,
    //             year: date.getFullYear(),
    //           };
    //         })
    //         const sortedDays = [...formatedDates, ...range].sort((a, b) => a.time - b.time);
    //         return [...sortedDays];
    //       });
    //     };

    //   };
    // };

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
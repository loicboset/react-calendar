import React, { useEffect, useState } from 'react';
import DateHeader from './DateHeader';
import DateRow from './DateRow';
import { create9WeeksFrame, placeItemsOnCalendar } from './utils';

const Calendar = ({ groups, items }) => {

  const [daysRange, setDaysRange] = useState([]);

  useEffect(() => {
    setDaysRange(create9WeeksFrame().map(date => {
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        itemAttached: undefined,
      };
    }));

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
            const formatedDates = dates.map(date => {
              return {
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                attachedItem: undefined,
              };
            })

            return [...range, ...formatedDates];
          });
        };
      };
    };

  }, []);

  useEffect(() => {
    placeItemsOnCalendar(items, daysRange, setDaysRange);

  }, [items, daysRange]);

  return (
    <div id='calendar' className='overflow-scroll border border-red flex-grow'>
      <DateHeader daysRange={daysRange} />
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
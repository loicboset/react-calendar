import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const [daysRange, setDaysRange] = useState([]);

  const createRange = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
  };

  useEffect(() => {
    console.log(create9WeeksFrame().map(date => date.getDate()));
    setDaysRange(create9WeeksFrame().map(date => ( {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()} )));

    const calendarContainer = document.querySelector('#calendar-parent');
    if (calendarContainer) {
      console.log(document.querySelector('#calendar-parent'));
      calendarContainer.onscroll = function () {
        if (calendarContainer.scrollWidth - 100 <= calendarContainer.clientWidth + calendarContainer.scrollLeft) {
          setDaysRange(range => {
            const rangeLength = range.length
            const lastDay = range[rangeLength - 1];
            // const additionalRange = createRange(lastDay + 1, lastDay + 50);
            let dates = [];
            console.log('lastDay', lastDay);
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

  const renderCalendar = () => {
    const groups = createRange(1, 10);

    return (
      <>
        <h1 className='p-2'>JLG Calendar Timeline</h1>
        <div id='wrapper' className='flex'>

          <div id='sidebar' className='w-6/12'>
            <div style={{ height: '40px' }} className='group border border-dark'>Date</div>
            {groups.map(group => {
              return (
                <div key={group} id={`group-${group}`} style={{ height: '40px' }} className='px-10 group border border-dark'>{`Group ${group}`}</div>
              )
            })}
          </div>

          <div id='calendar-parent' className='overflow-scroll border border-red flex-grow'>
            <div id='calendar-child' className='flex'>
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

        </div>
      </>
    )
  };

  const createElement = (group, startDateRef, endDateRef) => {
    const startDate = document.querySelector(`#elem-${group}-${startDateRef}`);
    console.log('startDate', startDate);
    const interval = endDateRef - startDateRef + 1;
    console.log('interval', interval);
    const element = document.createElement('div');
    element.classList.add('bg-red-500', 'absolute');
    element.style.height = '40px';
    element.style.width = `${40 * interval}px`;
    element.style.top = 0;
    element.style.left = 0;
    element.style.zIndex = 1;
    console.log('element', element);
    if (!startDate) return;
    startDate.appendChild(element);
    adjustRowHeight(4)
  };

  const adjustRowHeight = (groupId) => {
    const row = document.querySelector(`#row-group-${groupId}`);
    const group = document.querySelector(`#group-${groupId}`);
    console.log('row', row.offsetHeight);
    console.log('group', group);
    group.style.height = `${row.offsetHeight}px`;
  };

  const create9WeeksFrame = () => {
    const dates = [];
    const today = new Date();
    const month = today.getMonth();
    dates.push(new Date());

    // let nextMonthReached = false;
    // let currentDay = today;
    // while (!nextMonthReached) {
    //   const nextDate = new Date(currentDay.setDate(currentDay.getDate() + 1));
    //   nextDate.getMonth() === month
    //     ? dates.push(nextDate)
    //     : nextMonthReached = true
    // };

    // let previousMonthReached = false;
    // currentDay = new Date();
    // while (!previousMonthReached) {
    //   const previousDate = new Date(currentDay.setDate(currentDay.getDate() - 1));
    //   previousDate.getMonth() === month
    //     ? dates.push(previousDate)
    //     : previousMonthReached = true
    // };

    let currentDay = new Date();
    for (let i = 0; i < 31; i++) {
      const nextDate = new Date(currentDay.setDate(currentDay.getDate() + 1));
      dates.push(nextDate)
    };

    currentDay = new Date();
    for (let i = 31; i > 0; i--) {
      const nextDate = new Date(currentDay.setDate(currentDay.getDate() - 1));
      dates.push(nextDate)
    };

    return dates.sort((a, b) => a - b);
  };

  return (
    <div>
      {renderCalendar()}
      <button onClick={() => createElement(4, 12, 13)}>Add</button>
    </div>
  );
}

export default App;

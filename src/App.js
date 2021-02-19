import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const [daysRange, setDaysRange] = useState([]);

  const createRange = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
  };

  useEffect(() => {
    setDaysRange(createRange(1, 100));

    const calendarContainer = document.querySelector('#calendar-parent');
    if (calendarContainer) {
      console.log(document.querySelector('#calendar-parent'));
      calendarContainer.onscroll = function () {
        if (calendarContainer.scrollWidth - 100 <= calendarContainer.clientWidth + calendarContainer.scrollLeft) {
          setDaysRange(range => {
            const rangeLength = range.length
            const lastDay = range[rangeLength - 1];
            const additionalRange = createRange(lastDay + 1, lastDay + 50);
            return [...range, ...additionalRange];
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
                <div key={group} id={`group-${group}`} style={{ height: '40px' }} className='group border border-dark'>{`Group ${group}`}</div>
              )
            })}
          </div>

          <div id='calendar-parent' className='overflow-scroll border border-red'>
            <div id='calendar-child' className='flex'>
              {daysRange.map(day => {
                return (
                  <div key={day} style={{ flex: '0 0 40px', height: '40px' }} className='day  text-red-500'>{day}</div>
                )
              })}
            </div>
            {groups.map(group => {
              return (
                <div key={group} id={`row-group-${group}`} className='flex'>
                  {daysRange.map(day => {
                    return (
                      <div key={day} id={`elem-${group}-${day}`} style={{ flex: '0 0 40px', height: '40px' }} className=' relative'></div>
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

  // window.onscroll = debounce(() => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop
  //     === document.documentElement.offsetHeight
  //   ) {
  //     // Do awesome stuff like loading more content!
  //   }
  // }, 100);

  return (
    <div>
      {renderCalendar()}
      <button onClick={() => createElement(4, 12, 13)}>Add</button>
    </div>
  );
}

export default App;

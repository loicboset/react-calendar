import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/index';
import Calendar from './calendar/index';
import ItemComponent from './ItemComponent';
import Form from '../form/index';

const Timeline = () => {

  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [daysRange, setDaysRange] = useState([]);

  useEffect(() => {
    //NOTE(lb): ideally, we would change the keys from start_time and end_time
    // to startDate and endDate

    const mockData = (groupNumber, itemsPerGroup) => {
      const items = [];
      const groups = [];

      for (let i = 0; i < groupNumber; i++) {
        groups.push({
          id: i,
          title: `Employee ${i}`
        });
      };

      for (let i = 0; i < groups.length; i++) {

        let baseStartDate = new Date('2021', '01', '15', '12', '0', '0');
        let baseEndDate = new Date('2021', '01', '19', '12', '0', '0');
        for (let x = 0; x < itemsPerGroup; x++) {
          items.push({
            id: i,
            group: i,
            title: (<ItemComponent />),
            start_time: baseStartDate,
            end_time: baseEndDate,
          });
          baseStartDate = new Date(baseStartDate.setDate(baseStartDate.getDate() + 7));
          baseEndDate = new Date(baseEndDate.setDate(baseEndDate.getDate() + 7));
        };
      };

      return {items, groups};
    };

    const mockedData = mockData(2, 2);
    setGroups(mockedData.groups);
    setItems(mockedData.items);

  }, []);

  // const handleAddDay = (operation) => {
  //   // setDaysRange(range => {
  //   //   const lastDay = new Date(range[0].time);
  //   //   console.log('last day', lastDay);
  //   //   const previousDay = new Date(lastDay.setDate(lastDay.getDate() - 1));
  //   //   console.log('previousDay', previousDay);
  //   //   const newDay = {
  //   //     time: previousDay.getTime(),
  //   //     day: previousDay.getDate(),
  //   //     month: previousDay.getMonth() + 1,
  //   //     year: previousDay.getFullYear(),
  //   //   };
  //   //   return [newDay, ...range];
  //   // });
  //   if (operation === '-') {
  //     const calendar = document.querySelector('#calendar');
  //     setDaysRange(range => {
  //       if (range.length === 0) return range;
  //       const rangeLength = range.length;
  //       const firstDay = range[0];
  //       let dates = [];
  //       let currentDay = new Date(`${firstDay.month}-${firstDay.day}-${firstDay.year}`);
  //       for (let i = 0; i < 31; i++) {
  //         let nextDate = new Date(currentDay.setDate(currentDay.getDate() - 1))
  //         dates.push(nextDate)
  //       };
  //       const formatedDates = dates.map(date => {
  //         return {
  //           time: date.getTime(),
  //           day: date.getDate(),
  //           month: date.getMonth() + 1,
  //           year: date.getFullYear(),
  //         };
  //       })
  //       console.log('formatedDates', formatedDates);

  //       const slicedRange = range.splice(-31, 31);
  //       const sortedDays = [...slicedRange, ...formatedDates].sort((a, b) => a.time - b.time);

  //       // const slicedRange = range.splice(0, 31);
  //       // const sortedDays = [...range, ...formatedDates].sort((a, b) => a.time - b.time);
  //       return [...sortedDays];
  //     });
  //     calendar.scrollLeft += 31 * 40;
  //   } else {
  //     setDaysRange(range => {
  //       if (range.length === 0) return range;
  //       const rangeLength = range.length;
  //       const lastDay = range[rangeLength - 1];
  //       let dates = [];
  //       let currentDay = new Date(`${lastDay.month}-${lastDay.day}-${lastDay.year}`);
  //       for (let i = 0; i < 10; i++) {
  //         const nextDate = new Date(currentDay.setDate(currentDay.getDate() + 1));
  //         dates.push(nextDate)
  //       };
  //       const formatedDates = dates.map(date => {
  //         return {
  //           time: date.getTime(),
  //           day: date.getDate(),
  //           month: date.getMonth() + 1,
  //           year: date.getFullYear(),
  //         };
  //       })
  //       const slicedRange = range.splice(0, 31);
  //       const sortedDays = [...slicedRange, ...formatedDates].sort((a, b) => a.time - b.time);
  //       console.log('sortedDays', sortedDays);
  //       return [...sortedDays];
  //     });
  //   };
  // };

  return (
    <>
      <div id='wrapper' className='flex'>
        <Sidebar groups={groups} />
        <Calendar groups={groups} items={items} daysRange={daysRange} setDaysRange={setDaysRange} />
      </div>
      {/* FOR TESTING PURPOSES */}
      <Form setGroups={setGroups} setItems={setItems} />
      {/* <button onClick={() => handleAddDay('-')}>Add day in the past</button>
      <button onClick={() => handleAddDay('+')}>Add day in the future</button> */}
    </>
  );
};

export default Timeline;
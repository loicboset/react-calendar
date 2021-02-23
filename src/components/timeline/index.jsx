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

    const mockedData = mockData(10, 4);
    setGroups(mockedData.groups);
    setItems(mockedData.items);

  }, []);

  useEffect(() => {
    console.log('number of days displayed:', daysRange.length);
  }, [daysRange])

  // const handleRemoveDays = () => {
  //   console.log('handleRemoveDays');
  //   const calendar = document.querySelector('#calendar');
  //   console.log('scroll Left before', calendar.scrollLeft);
  //   setDaysRange(range => {
  //     range.splice(0, 10);
  //     return [...range];
  //   });
  //   // 20 seems to be perfect
  //   calendar.scrollLeft -= 20 * 40
  //   console.log('scroll Left after', calendar.scrollLeft);
  // };

  // const handleAddDays = () => {
  //   console.log('handleAddDays');
  //   const calendar = document.querySelector('#calendar');
  //   console.log('scroll Left before', calendar.scrollLeft);
  //   setDaysRange(range => {
  //     range.splice(-10, 10);
  //     return [...range];
  //   });
  //   console.log('scroll Left after', calendar.scrollLeft);
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
      {/* <button onClick={handleRemoveDays}>remove days</button>
      <button onClick={handleAddDays}>add days</button> */}
    </>
  );
};

export default Timeline;
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/index';
import Calendar from './calendar/index';
import ItemComponent from './ItemComponent';

const Timeline = () => {

  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);

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

        let baseStartDate = new Date('2021', '01', '01', '12', '0', '0');
        let baseEndDate = new Date('2021', '01', '05', '12', '0', '0');
        for (let x = 0; x < itemsPerGroup; x++) {
          items.push({
            id: i,
            group: i,
            // title: `item ${i}`,
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

    const mockedData = mockData(40, 4);
    console.log('mockedData', mockedData);
    setGroups(mockedData.groups);
    setItems(mockedData.items);

  }, []);

  return (
    <div id='wrapper' className='flex'>
      <Sidebar groups={groups} />
      <Calendar groups={groups} items={items} />
    </div>
  );
};

export default Timeline;
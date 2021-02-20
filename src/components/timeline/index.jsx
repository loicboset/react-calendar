import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/index';
import Calendar from './calendar/index';
import { createRange } from './utils';

const Timeline = () => {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(createRange(1, 10));
  }, []);

  return (
    <div id='wrapper' className='flex'>
      <Sidebar groups={groups} />
      <Calendar groups={groups} />
    </div>
  );
};

export default Timeline;
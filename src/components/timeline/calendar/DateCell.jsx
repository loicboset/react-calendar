import React, { useState, useEffect } from 'react';

const DateCell = ({ date, groupId, item }) => {

  const [intervalWidth, setIntervalWidth] = useState(1);

  useEffect(() => {
    if (item) {
      const interval = (item.end_time.getTime() - item.start_time.getTime()) / (1000*60*60*24) + 1;
      setIntervalWidth(`${interval * 40}px`);
    };
  }, [item]);

  return (
    <div
      id={`elem-${groupId}-${date.day}-${date.month}-${date.year}`}
      style={{ flex: '0 0 40px', height: '40px' }}
      className='relative'
    >
      <div className='absolute' style={{ top: 0, left: 0, bottom: 0, width: intervalWidth }}>
       {item && item.title}
      </div>
    </div>
  );
};

export default DateCell;

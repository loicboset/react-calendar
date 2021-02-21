import React, { useEffect, useState } from 'react';
import DateCell from './DateCell';

const DateRow = ({ daysRange, group, items }) => {

  useEffect(() => {
    console.log('hello');
  }, []);

  return (
    <div id={`row-group-${group.id}`} className='flex'>
      {daysRange.map(date => {
        console.log('hello');
        return (
          <DateCell
            key={`${group.id}-${date.day}-${date.month}-${date.year}`}
            date={date}
            groupId={group.id}
          />
        )
      })}
    </div>
  );
};

export default DateRow;
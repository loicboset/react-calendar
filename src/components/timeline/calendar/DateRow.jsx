import React, { useEffect, useState } from 'react';
import DateCell from './DateCell';

const DateRow = ({ daysRange, group, items }) => {

  return (
    <div id={`row-group-${group.id}`} className='flex'>
      {daysRange.map(date => {
        const item = items.find(item => {
          const day = item.start_time.getDate();
          const month = item.start_time.getMonth() +1;
          const year = item.start_time.getFullYear();
          return date.day === day && date.month === month && date.year === year;
        });
        return (
          <DateCell
            key={`${group.id}-${date.day}-${date.month}-${date.year}`}
            date={date}
            groupId={group.id}
            item={item}
          />
        )
      })}
    </div>
  );
};

export default DateRow;
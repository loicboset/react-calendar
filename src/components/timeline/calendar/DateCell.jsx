import React from 'react';

const DateCell = ({ date, groupId, attachedItem }) => {

  return (
    <div
      id={`elem-${groupId}-${date.day}-${date.month}-${date.year}`}
      style={{ flex: '0 0 40px', height: '40px' }}
      className=' relative'
    >
      {attachedItem}
    </div>
  );
};

export default DateCell;
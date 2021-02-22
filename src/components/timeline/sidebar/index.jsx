import React from 'react';

const Sidebar = ({ groups }) => {

  return (
    <div id='sidebar'>
      <div style={{ height: '40px' }} className='group border border-dark'>Date</div>
      {groups.map(group => {
        return (
          <div key={group.id} id={`group-${group.id}`} style={{ height: '40px' }} className='px-10 group border border-dark'>{group.title}</div>
        )
      })}
    </div>
  );
};

export default Sidebar;
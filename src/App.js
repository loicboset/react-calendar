import React, { useEffect, useState } from 'react';
import './App.css';
import Timeline from './components/timeline/index';

const App = () => {

  // const adjustRowHeight = (groupId) => {
  //   const row = document.querySelector(`#row-group-${groupId}`);
  //   const group = document.querySelector(`#group-${groupId}`);
  //   console.log('row', row.offsetHeight);
  //   console.log('group', group);
  //   group.style.height = `${row.offsetHeight}px`;
  // };

  return (
    <div>
      <h1 className='p-2'>JLG Calendar Timeline</h1>
      <Timeline />
    </div>
  );
}

export default App;

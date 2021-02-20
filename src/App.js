import React, { useEffect, useState } from 'react';
import './App.css';
import Timeline from './components/timeline/index';

const App = () => {

  const createElement = (group, startDateRef, endDateRef) => {
    const startDate = document.querySelector(`#elem-${group}-${startDateRef}`);
    console.log('startDate', startDate);
    const interval = endDateRef - startDateRef + 1;
    console.log('interval', interval);
    const element = document.createElement('div');
    element.classList.add('bg-red-500', 'absolute');
    element.style.height = '40px';
    element.style.width = `${40 * interval}px`;
    element.style.top = 0;
    element.style.left = 0;
    element.style.zIndex = 1;
    console.log('element', element);
    if (!startDate) return;
    startDate.appendChild(element);
    adjustRowHeight(4)
  };

  const adjustRowHeight = (groupId) => {
    const row = document.querySelector(`#row-group-${groupId}`);
    const group = document.querySelector(`#group-${groupId}`);
    console.log('row', row.offsetHeight);
    console.log('group', group);
    group.style.height = `${row.offsetHeight}px`;
  };

  return (
    <div>
      <h1 className='p-2'>JLG Calendar Timeline</h1>
      <Timeline />
      <button onClick={() => createElement(4, 12, 13)}>Add</button>
    </div>
  );
}

export default App;

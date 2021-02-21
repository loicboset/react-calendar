import React, { useState } from 'react';
import ItemComponent from '../timeline/ItemComponent';

const Form = ({ setGroups, setItems }) => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [group, setGroup] = useState('');
  const [groupName, setGroupName] = useState('');

  const handleSubmitWorkload = e => {
    e.preventDefault();

    setItems(items => {

      const lastId = items[items.length - 1].id;

      const newItem = {
        id: lastId + 1,
        group: group,
        title: (<ItemComponent />),
        start_time: new Date(startDate),
        end_time: new Date(endDate),
      };

      return [...items, newItem];

    })

  };

  const handleSubmitGroup = e => {
    e.preventDefault()
    setGroups(groups => {
      const lastId = groups[groups.length - 1].id;
      const newGroup = {
        id: lastId + 1,
        title: groupName
      }
      return [...groups, newGroup];
    });
  };

  return (
    <>
      <p>Add group</p>
      <form className='border border-black w-1/4 flex flex-col p-4 m-4'>
        <label>Group</label>
        <input
          className='border border-black p-1 m-1'
          type='string'
          placeholder='group name'
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        <button onClick={e => handleSubmitGroup(e)}>Submit</button>
      </form>

      <p>Add workload</p>
      <form className='border border-black w-1/4 flex flex-col p-4 m-4'>
        <label>Start date</label>
        <input
          type='date'
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <label>End date</label>
        <input
          type='date'
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <label>Group</label>
        <input
          className='border border-black p-1 m-1'
          type='number'
          placeholder='0'
          value={group}
          onChange={e => setGroup(parseInt(e.target.value, 10))}
        />
        <button onClick={e => handleSubmitWorkload(e)}>Submit</button>
      </form>
    </>
  );
};

export default Form;
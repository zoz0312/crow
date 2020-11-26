import React, { useState } from 'react';
import { dbService } from 'firebaseSetup';
import { COLLECTION } from '../constants';

const Home = () => {
  const [crow, setCrow] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection(COLLECTION).add({
      crow,
      createdAt: Date.now(),
    });
    setCrow('');
  }
  const onChange = (event) => {
    const { target: { value } } = event;
    setCrow(value);
  }
  return (
    <div>
      <span>Home</span>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="까악!"
          maxLength={120}
          value={crow}
          onChange={onChange}
          />
        <button>까악하기</button>
      </form>
    </div>
  )
}

export default Home;
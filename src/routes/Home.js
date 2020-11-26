import React, { useState } from 'react';

const Home = () => {
  const [crow, setCrow] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
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
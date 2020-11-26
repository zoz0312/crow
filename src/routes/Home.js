import React, { useEffect, useState } from 'react';
import { dbService } from 'firebaseSetup';
import { COLLECTION } from '../constants';

const Home = () => {
  const [crow, setCrow] = useState('');
  const [crows, setCrows] = useState([]);
  const getCrows = async () => {
    const listUpCrows = await dbService.collection(COLLECTION).get();
    listUpCrows.forEach(document => {
      const crowObject = {
        ...document.data(),
        id: document.id,
      }
      setCrows(prev => [crowObject, ...prev]);
    });
  }

  useEffect(() => {
    getCrows();
  }, []);

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
      <div>
        {crows.map(item => (
          <div key={item.id}>
            <h4>{item.crow}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
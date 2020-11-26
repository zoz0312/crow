import React, { useEffect, useState } from 'react';
import { dbService } from 'firebaseSetup';
import { COLLECTION } from '../constants';
import Crow from 'components/crow';

const Home = ({ userObject }) => {
  const [crow, setCrow] = useState('');
  const [crows, setCrows] = useState([]);

  useEffect(() => {
    dbService.collection(COLLECTION).onSnapshot((snap) => {
      const snaps = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCrows(snaps);
    })
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection(COLLECTION).add({
      text: crow,
      createdAt: Date.now(),
      creatorId: userObject.uid,
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
          <Crow
            key={item.id}
            crowObject={item}
            isOwner={userObject.uid === item.creatorId}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;
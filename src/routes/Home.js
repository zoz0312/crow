import React, { useEffect, useState } from 'react';
import { dbService } from 'firebaseSetup';
import { COLLECTION } from '../constants';
import Crow from 'components/Crow';
import CrowFactory from 'components/CrowFactory';

const Home = ({ userObject }) => {
  const [crows, setCrows] = useState([]);

  useEffect(() => {
    dbService.collection(COLLECTION).onSnapshot((snap) => {
      const snaps = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCrows(snaps);
    });
    return () => {
      setCrows([]);
    };
  }, []);

  return (
    <div>
      <span>Home</span>
      <CrowFactory userObject={userObject} />
      {crows.map(item => (
        <Crow
          key={item.id}
          crowObject={item}
          isOwner={userObject.uid === item.creatorId}
        />
      ))}
    </div>
  )
}

export default Home;
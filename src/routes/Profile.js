import { authService, dbService } from 'firebaseSetup';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { COLLECTION } from '../constants';

const Profile = ({ userObject }) => {
  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push('/');
  }

  const getMyProfile = async () => {
    const crows = await dbService
      .collection(COLLECTION)
      .where('creatorId', '==', userObject.uid)
      // .orderBy('createdAt')
      .get();

    const data = crows.docs.map(doc => doc.data());
    console.log('data', data);
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  )
}

export default Profile;
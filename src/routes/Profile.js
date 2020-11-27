import { authService, dbService } from 'firebaseSetup';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { COLLECTION } from '../constants';

const Profile = ({ userObject, refreshUser }) => {
  const history = useHistory();
  const [userName, setUserName] = useState(userObject.displayName);

  const onLogoutClick = () => {
    authService.signOut();
    history.push('/');
  }

  // const getMyProfile = async () => {
  //   const crows = await dbService
  //     .collection(COLLECTION)
  //     .where('creatorId', '==', userObject.uid)
  //     // .orderBy('createdAt')
  //     .get();

  //   crows.docs.map(doc => doc.data());
  // };

  // useEffect(() => {
  //   getMyProfile();
  // }, []);

  const onChange = (event) => {
    const { target : { value } } = event;
    setUserName(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObject.displayName !== userName) {
      // TODO: user image set
      await userObject.updateProfile({
        displayName: userName,
      });
      refreshUser();
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={userName}
          onChange={onChange}
        />
        <button>내 정보 업데이트</button>
      </form>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  )
}

export default Profile;
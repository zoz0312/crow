import { authService, dbService } from 'firebaseSetup';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { COLLECTION } from '../constants';
import './Profile.scss';
import { Form, Button } from 'react-bootstrap';
import LoadingButton from '../entities/Button/LoadingButton';

const Profile = ({ userObject, refreshUser }) => {
  const history = useHistory();
  const [userName, setUserName] = useState(userObject.displayName);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;
    setIsSubmitting(true);
    event.preventDefault();
    if (userObject.displayName !== userName) {
      // TODO: user image set
      await userObject.updateProfile({
        displayName: userName,
      });
      refreshUser();
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        className="profile-form">
        <Form.Control
          type="text"
          placeholder="Display name"
          value={userName}
          onChange={onChange}
          className="profile-form--input"
          disabled={isSubmitting}
        />
        <LoadingButton
          type="submit"
          className="fixed-button profile-btn profile__fixed-button"
          variant=""
          isLoading={isSubmitting}>내 정보 업데이트</LoadingButton>
      </Form>
      <Button
        type="button"
        className="cancle-button profile-btn"
        variant=""
        onClick={onLogoutClick}>Logout</Button>
    </>
  )
}

export default Profile;
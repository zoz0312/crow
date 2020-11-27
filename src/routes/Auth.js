import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'firebaseSetup';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons"
import LoadingButton from 'entities/Button/LoadingButton';
import './Auth.scss'
import crow from 'image/crow.jpg';

const Auth = () => {
  const [newAccount, setNewAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      if (newAccount) {
        setNewAccount(false);
      }
    }
  }, [isSubmitting])

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const toggleSubmitting = (isSubmitting) => setIsSubmitting(isSubmitting);

  const onSocialClick = async (event) => {
    if (isSubmitting) return;
    const { currentTarget: { name } } = event;
    let provider;

    setIsSubmitting(true);
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 5000);
    await authService.signInWithPopup(provider);
  }

  return (
    <div className="login-container">
      <span className="login-container--title">Crow</span>
      <Image className="crow-image" src={`${crow}`} roundedCircle />
      <AuthForm
        newAccount={newAccount}
        toggleSubmitting={toggleSubmitting}
        isSubmitting={isSubmitting}
      />
      <div className="login-container__option-container">
        <Button
          onClick={toggleAccount}
          variant=""
          className="base-button"
        >
          {newAccount ? '로그인하기' : '유저 생성하기' }
        </Button>
        <LoadingButton
          buttonClick={onSocialClick}
          name="google"
          variant=""
          className="google-button"
          isLoading={isSubmitting}
        >
          <FontAwesomeIcon icon={faGoogle} />&nbsp;구글 로그인
        </LoadingButton>
        <LoadingButton
          buttonClick={onSocialClick}
          name="github"
          variant=""
          className="github-button"
          isLoading={isSubmitting}
        >
          <FontAwesomeIcon icon={faGithub} />&nbsp;깃허브 로그인
        </LoadingButton>
      </div>
    </div>
  )
}

export default Auth;
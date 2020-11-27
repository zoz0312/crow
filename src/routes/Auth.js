import AuthForm from 'components/Auth/AuthForm';
import { authService, firebaseInstance } from 'firebaseSetup';
import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons"
import './Auth.scss'
import crow from 'image/crow.jpg';

const Auth = () => {
  const [newAccount, setNewAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const toggleSubmitting = (isSubmitting) => setIsSubmitting(isSubmitting);

  const onSocialClick = async (evnet) => {
    const { target: { name } } = evnet;
    let provider;

    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }

  return (
    <div className="login-container">
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
        <Button
          onClick={onSocialClick}
          name="google"
          variant=""
          className="google-button"
        >
          <FontAwesomeIcon icon={faGoogle} />&nbsp;구글 로그인
        </Button>
        <Button
          onClick={onSocialClick}
          name="github"
          variant=""
          className="github-button"
        >
          <FontAwesomeIcon icon={faGithub} />&nbsp;깃허브 로그인
        </Button>
      </div>
    </div>
  )
}

export default Auth;
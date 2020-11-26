import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'firebaseSetup';
import React from 'react';

const Auth = () => {

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
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">구글로 계속하기</button>
        <button onClick={onSocialClick} name="github">깃허브로 계속하기</button>
      </div>
    </div>
  )
}

export default Auth;
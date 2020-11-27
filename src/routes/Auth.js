import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'firebaseSetup';
import React from 'react';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons"
import './Auth.scss'
import crow from 'image/crow.jpg';

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
    <div className="login-container">
      <Image className="crow-image" src={`${crow}`} roundedCircle />
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          <FontAwesomeIcon icon={faGoogle} />
          구글로 계속하기
        </button>
        <button onClick={onSocialClick} name="github">
          <FontAwesomeIcon icon={faGithub} />
          깃허브로 계속하기
        </button>
      </div>
    </div>
  )
}

export default Auth;
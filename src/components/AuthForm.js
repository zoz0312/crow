import { authService } from 'firebaseSetup';
import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './AuthForm.scss';
import LoadingButton from 'entities/Button/LoadingButton';

const AuthForm = ({ newAccount, toggleSubmitting, isSubmitting }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recapPassword, setRecapPassword] = useState('');

  const passwordRef = useRef(null);

  const [error, setError] = useState(null);
  const errorCss = 'error-alram';
  const erorrRef = useRef(null);
  const timeout = {
    enter: 100,
    exit: 100,
  }

  const errorText = (text = null) => {
    setError(text);
    if (text && erorrRef.current) {
      erorrAnimationReload();
    }
  }

  const erorrAnimationReload = () => {
    const animationClass = erorrRef.current.classList;
    animationClass.remove(`${errorCss}-enter-done`);
    animationClass.add(`${errorCss}-enter-active`);
    setTimeout(() => {
      animationClass.remove(`${errorCss}-enter-active`);
      animationClass.add(`${errorCss}-enter-done`);
    }, timeout.enter)
  }

  const onChange = (event) => {
    const { target : { name, value } } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'password2') {
      setRecapPassword(value);
    }
  }

  const onSubmit = async (event) => {
    if (isSubmitting) return;
    event.preventDefault();
    toggleSubmitting(true);
    try {
      if (newAccount) {
        // create account
        if (password !== recapPassword) {
          errorText(`비밀번호가 다르다 까악!`);
          toggleSubmitting(false);
          return;
        }
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // login
        await authService.signInWithEmailAndPassword(email, password);
      }
      errorText()
    } catch (error) {
      errorText(error.message);
    }
    toggleSubmitting(false);
  }

  return (<>
    <Form
      onSubmit={onSubmit}
      className="login__auth-container"
    >
      <Form.Control
        name="email"
        type="text"
        className="auth-containter--input"
        placeholder="Email"
        required
        value={email}
        onChange={onChange} />
      <Form.Control
        name="password"
        type="password"
        className="auth-containter--input"
        placeholder="Password"
        required
        value={password}
        onChange={onChange} />
      <CSSTransition
        nodeRef={passwordRef}
        in={newAccount}
        timeout={200}
        classNames="second-password"
        unmountOnExit
      >
        <Form.Control
          ref={passwordRef}
          name="password2"
          type="password"
          className="auth-containter--input"
          placeholder="Recap Password"
          required
          value={recapPassword}
          onChange={onChange} />
      </CSSTransition>

      <LoadingButton
        type="submit"
        variant=""
        className="base-button auth-containter--submit"
        isLoading={isSubmitting}
      >
        {newAccount ? '유저 생성' : '로그인'}
      </LoadingButton>

      <CSSTransition
        nodeRef={erorrRef}
        in={Boolean(error)}
        timeout={timeout}
        classNames={errorCss}
        mountOnEnter
        unmountOnExit
      >
        <span
          ref={erorrRef}
          className="auth-container--text"
        >
          { error }
        </span>
      </CSSTransition>
    </Form>
  </>);
}

export default AuthForm;
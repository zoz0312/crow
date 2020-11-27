import { authService } from 'firebaseSetup';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './AuthForm.scss';

const AuthForm = () => {
  const [newAccount, setNewAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recapPassword, setRecapPassword] = useState('');
  const [error, setError] = useState(null);

  const toggleAccount = () => setNewAccount((prev) => !prev);

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
    event.preventDefault();
    try {
      if (newAccount) {
        // create account
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // login
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
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
        in={newAccount}
        timeout={200}
        classNames="second-password"
        unmountOnExit
      >
        <Form.Control
          name="password2"
          type="password"
          className="auth-containter--input"
          placeholder="Recap Password"
          required
          value={recapPassword}
          onChange={onChange} />
      </CSSTransition>
      { error }
      <Button
        type="submit"
        variant=""
        className="login-button"
      >
        {newAccount ? '유저 생성하기' : '로그인'}
      </Button>
    </Form>
    <Button onClick={toggleAccount}>{newAccount ? '로그인' : '유저 생성하기' }</Button>
  </>);
}

export default AuthForm;
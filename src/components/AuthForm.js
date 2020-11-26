import { authService } from 'firebaseSetup';
import React, { useState } from 'react';

const AuthForm = () => {
  const [newAccount, setNewAccount] = useState(true);
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
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="text"
        placeholder="Email"
        required
        value={email}
        onChange={onChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={onChange} />
      { newAccount &&
        <input
          name="password2"
          type="password"
          placeholder="Recap Password"
          required
          value={recapPassword}
          onChange={onChange} />
      }
      { error }
      <input type="submit" value={newAccount ? '유저 생성하기' : '로그인'} />
    </form>
    <span onClick={toggleAccount}>{newAccount ? '로그인' : '유저 생성하기' }</span>
  </>);
}

export default AuthForm;
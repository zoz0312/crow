import { authService } from 'firebaseSetup';
import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recapPassword, setRecapPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

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
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div>
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
        <input type="submit" value={newAccount ? '유저 생성하기' : '로그인'} />
      </form>
      <div>
        <button>구글로 계속하기</button>
        <button>깃허브로 계속하기</button>
      </div>
    </div>
  )
}

export default Auth;
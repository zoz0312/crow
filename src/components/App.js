import { useState } from 'react';
import AppRouter from 'components/Router';
import firebase from 'firebaseSetup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;

import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebaseSetup';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} /> : '동기화중...' }
    </>
  );
}

export default App;

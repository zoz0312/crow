import { useEffect, useMemo, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebaseSetup';

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);
  const isLoggedIn = useMemo(() => (userObject ? true : false), [userObject]);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject(user);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      { init ?
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObject={userObject}
        />
      : '동기화중...' }
    </>
  );
}

export default App;

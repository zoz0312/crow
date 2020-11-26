import { useEffect, useMemo, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebaseSetup';

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      { init ?
        <AppRouter
          isLoggedIn={Boolean(userObject)}
          userObject={userObject}
        />
      : '동기화중...' }
    </>
  );
}

export default App;

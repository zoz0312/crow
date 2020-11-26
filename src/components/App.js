import { useEffect, useMemo, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebaseSetup';

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <>
      { init ?
        <AppRouter
          isLoggedIn={Boolean(userObject)}
          userObject={userObject}
          refreshUser={refreshUser}
        />
      : '동기화중...' }
    </>
  );
}

export default App;

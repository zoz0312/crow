import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebaseSetup';
import { Container } from 'react-bootstrap';
import './App.scss'

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
      } else {
        setUserObject(null);
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
    <Container>
      { init ?
        <article className="main-article">
          <AppRouter
            isLoggedIn={Boolean(userObject)}
            userObject={userObject}
            refreshUser={refreshUser}
          />
        </article>
      : '동기화중...' }
    </Container>
  );
}

export default App;

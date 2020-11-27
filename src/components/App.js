import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'firebaseSetup';
import { Container } from 'react-bootstrap';
import './App.scss'
import LoadSpinner from './LoadSpinner';

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);
  const [isLoadded, setIsLoadded] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setIsLoadded(false);
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
      setIsLoadded(true);
    });

    return () => {
      setUserObject(null);
    }
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
      <Container>
        { init &&
          <article className="main-article">
            <AppRouter
              isLoggedIn={Boolean(userObject)}
              userObject={userObject}
              refreshUser={refreshUser}
              isLoadded={(isLoadded) => setIsLoadded(isLoadded)}
            />
          </article>
        }
      </Container>
      <LoadSpinner isLoadded={isLoadded } />
    </>
  );
}

export default App;

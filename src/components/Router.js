import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObject, refreshUser }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userObject={userObject} />}
      <Switch>
        {isLoggedIn ? (
          <div>
            <Route exact path="/">
              <Home userObject={userObject} />
            </Route>
            <Route exact path="/profile">
              <Profile userObject={userObject} refreshUser={refreshUser} />
            </Route>
          </div>
        ):(
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter;
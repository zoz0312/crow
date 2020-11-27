import React from 'react';
import { Link } from 'react-router-dom';
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navigation.scss'

const Navigation = ({ userObject }) => {
  return (
    <>
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className="navigation--icon" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="navigation--icon" />
          </Link>
        </li>
      </ul>
      <span className="navigation--user">{ userObject.displayName }</span>
      <span className="navigation--span">님&nbsp;환영합니다.</span>
    </nav>
    </>
  )
};

export default Navigation;
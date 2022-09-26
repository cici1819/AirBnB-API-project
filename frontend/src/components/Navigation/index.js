// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginFormModal';
import SignupForm from '../SignupFormModal';
import logo from "../../images/logo.png"
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    )
  } else {
    sessionLinks = (
      <>
        <LoginForm />
        <SignupForm />
      </>
    );
  }

  return (
    <div className='header'>
      <NavLink exact to="/" claseeName="link-home">
        <img src={logo} className="logo" alt="Aircnc-logo" />
        <h1 className='title'>Aircnc</h1>
      </NavLink>
      <nav className='user-auth'>
        {isLoaded && sessionLinks}
      </nav>
      <nav className='creat-spot'>
        <NavLink to="/spots" className='creat-spot-link'>
          <button className='create-spot-button'>Become a Host</button>
        </NavLink>
      </nav>
    </div>

  );
}

export default Navigation;

// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index';
import SignupFormModal from '../SignupFormModal/index';
import AddSpotFormModal from '../AddSpotFormModal';
import SearchBar from '../Search/SearchBar';
// import LoginForm from '../LoginFormModal/LoginForm';
// import SignupForm from '../SignupFormModal/SignupForm';
// import { Modal } from '../../context/Modal';
import logo from "../../images/logo.png"
import './Navigation.css';
import { useEffect, useState } from 'react';
import LoginButton from './LoginButton';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    )
  } else {
    sessionLinks = (
      <>

        <LoginButton
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
      </>
    );
  }

  return (
    <>

      <div className='header'>
        <NavLink exact to="/" className="link-home">
          <img src={logo} className="logo" alt="Aircnc-logo" />
          <h1 className='title'>Aircnc</h1>
        </NavLink>
        <div className='nav-bar-middle'>
          <SearchBar />
        </div>
        <nav className='creat-spot'>
          <AddSpotFormModal />
        </nav>

        <div className='open-login-menu'>
          <LoginFormModal

            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}

          />
          <SignupFormModal

            showSignupModal={showSignupModal}
            setShowSignupModal={setShowSignupModal}

          />

        </div>
        <nav className='user-auth'>
          {isLoaded && sessionLinks}
        </nav>
      </div>
    </>

  );
}

export default Navigation;

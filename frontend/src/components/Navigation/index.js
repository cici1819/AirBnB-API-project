// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index';
import SignupFormModal from '../SignupFormModal/index';
// import LoginForm from '../LoginFormModal/LoginForm';
// import SignupForm from '../SignupFormModal/SignupForm';
// import { Modal } from '../../context/Modal';
import logo from "../../images/logo.png"
import './Navigation.css';
import { useEffect, useState } from 'react';

function Navigation({ isLoaded, loginModal, setLoginModal }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  // const [showSignupModal, setShowSignupModal] = useState(false);


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
        <LoginFormModal
          setShowMenu={setShowMenu}
          closeMenu={closeMenu} />

        <SignupFormModal
          setShowMenu={setShowMenu}
          closeMenu={closeMenu} />
      </>
    );
  }

  return (
    <div className='header'>
      <NavLink exact to="/" className="link-home">
        <img src={logo} className="logo" alt="Aircnc-logo" />
        <h1 className='title'>Aircnc</h1>
      </NavLink>
      {/* <div className='drop-down2'>
        <button
          onClick={openMenu}
          className="user-button">
          <i className="fa-solid fa-bars"></i>
          <i class="fa-solid fa-circle-user"></i>
        </button>
        {showMenu && (
          <div>
            <LoginFormModal
              setShowMenu={setShowMenu}
              closeMenu={closeMenu} />

            <SignupFormModal
              setShowMenu={setShowMenu}
              closeMenu={closeMenu} />
          </div>
        )} */}

      {/* </div> */}
      <nav className='user-auth'>
        {isLoaded && sessionLinks}
      </nav>
      {/* <nav className='creat-spot'>
        <NavLink to="/spots" className='creat-spot-link'>
          <button className='create-spot-button'>Become a Host</button>
        </NavLink>
      </nav> */}
    </div>

  );
}

export default Navigation;

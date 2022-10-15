// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
//  import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
// import SignupFormModal from "../SignupFormModal";
import './Navigation.css'


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    //  const sessionUser = useSelector(state => state.session.user);
     const closeMenu = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        if (!showMenu) return;
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <>
            <div className="menu-div">
                <button onClick={openMenu} className="user-button">
                    <i className="fa-solid fa-bars"></i>
                    <i class="fa-solid fa-circle-user"></i>
                </button>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <div className="user-info">
                            <li>Welcome, {user.username}</li>
                            <li>{user.email}</li>
                        </div>
                        <div className="user-spot-info">
                            <li>
                                <NavLink className='my-spots' to={'/spots/current'}>My Spots</NavLink>
                            </li>
                            <li>
                                <NavLink className='my-review' to={'/reviews/current'}>My Reviews</NavLink>
                            </li>
                            {/* <li>
                                <NavLink className='add-spot' to={'/spots'}>Become a Host</NavLink>
                            </li> */}
                        </div>
                        <li>
                            <button onClick={logout} className="log-out">Log Out</button>
                        </li>
                    </ul>
                )}
                {/* {!sessionUser && (
                <ul className="profile-dropdown2">
                    <LoginFormModal
                        setShowMenu={setShowMenu}
                        closeMenu={closeMenu}
                        />
                        <SignupFormModal
                           setShowMenu={setShowMenu}
                           closeMenu={closeMenu}
                        />


                </ul>
            )} */}
            </div>

        </>
    );
}

export default ProfileButton;

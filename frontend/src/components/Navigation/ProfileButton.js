// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    const sessionUser = useSelector(state => state.session.user);
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
    };

    return (
        <>
            <div className="menu-div">
                <button onClick={openMenu} className="user-button">
                <i className="fa-solid fa-bars"></i>
                <i class="fa-solid fa-circle-user"></i>
            </button>
            {sessionUser&& showMenu && (
                    <ul className="profile-dropdown">
                        <li>Welcome, {user.username}</li>
                        <li>{user.email}</li>
                        {/* <li>
                            <button onClick={YourSpots} className ="your-spot"> Your Spots
                            </button>
                        </li>
                        <li>
                            <button onClick={YourReviews} className ="your-reviews"> Your Reviews
                            </button>
                        </li>
                        <li>
                            <button onClick={AddSpot} className ="add-spot"> Create a Spot
                            </button>
                        </li> */}
                    <li>
                        <button onClick={logout} className="log-out">Log Out</button>
                    </li>
                </ul>
                )}
                {!sessionUser && showMenu && (
                <ul className="profile-dropdown2">
                    <LoginFormModal
                        setShowMenu={setShowMenu}
                        closeMenu={closeMenu}
                    />
                    <NavLink to="/signup">
                        <button className="signup-button">
                            Sign Up
                        </button>
                    </NavLink>
                </ul>
            )}
            </div>

        </>
    );
}

export default ProfileButton;

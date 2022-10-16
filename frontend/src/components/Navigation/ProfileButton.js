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
                <button onClick={openMenu} className="pofile-button">
                    <div className='s-fa-bar'>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className='s-user'>
                        <i class="fa-solid fa-circle-user"></i>
                    </div>
                </button>
            </div>
            {showMenu && (
                <div id='profile-dropdown'>
                    {/* <ul className="profile-drop-menu"> */}
                    <div className="user-info">
                        <div className="user-name">
                            Welcome,
                            {user.username}
                        </div>
                        <div className="user-email">
                            {user.email}
                        </div>

                    </div>
                    {/* <div className="user-spot-info"> */}

                        <div className='user-spot-info'>
                            <NavLink to={'/spots/current'}>My Spots</NavLink>
                        </div>

                        <div className='user-spot-info'>
                            <NavLink to={'/reviews/current'}>My Reviews</NavLink>
                        </div>

                        <div onClick={logout} className="user-spot-info" id="log-out">Log Out</div>

                        {/* <li>
                                <NavLink className='add-spot' to={'/spots'}>Become a Host</NavLink>
                            </li> */}
                    {/* </div> */}



                    {/* </ul> */}
                </div>
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


        </>
    );
}

export default ProfileButton;

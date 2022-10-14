import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import LoginFormModal from '../LoginFormModal/index';
import SignupFormModal from '../SignupFormModal/index';
// import { useState } from 'react';

const LoginButton = ()=>{
    //  const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
         };

        document.addEventListener('click', closeMenu);



        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    return (
        <>
            <div className='dropdown2'>
            <button
          onClick={openMenu}
          className="user-button">
          <i className="fa-solid fa-bars"></i>
          <i class="fa-solid fa-circle-user"></i>
        </button>

               {showMenu&&(<div className="login-dropdown">
                    <LoginFormModal />

                    <SignupFormModal />
                </div>
               )}

           </div>





        </>



    )
}


export  default LoginButton

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import LoginFormModal from '../LoginFormModal';
// import SignUpFormModal from "../SignupFormModal";

const LoginButton = ({setShowSignupModal,setShowLoginModal}) => {
    const dispatch = useDispatch()
    let [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if (showMenu) return;
        else setShowMenu(true);
    }

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
            <div className='dropdown-menu'>
                <div className='profile-button-div'>
                    <button onClick={openMenu} className='profile-button'>
                        <i className="fa-solid fa-bars"></i>
                        <i className="fa-regular fa-user"></i>
                    </button>
                </div>

                {showMenu && (
                    <div className='login-dropdown'>
                    <div className='login-signup-div'>
                        <div className='login-div'
                        onClick={()=>setShowLoginModal(true)}
                        >
                         Log In
                        </div>
                        <div className='signup-div'
                        onClick={()=>setShowSignupModal(true)}
                        >
                          Sign Up
                        </div>
                    </div>

                </div>)}

            </div>
        </>
    )
}


export default LoginButton;

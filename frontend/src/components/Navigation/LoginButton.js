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
            <div className='home-page-button'>
                <div className='profile-button-div'>
                    <button onClick={openMenu} className='pofile-button'>
                        <div className='s-fa-bar'>
                        <i className="fa-solid fa-bars"></i>
                        </div>
                        <div className='s-user'>
                        <i className="fa-solid fa-circle-user"></i>
                      </div>

                    </button>
                </div>
             </div>
                {showMenu && (
                    <div  className='login-dropMenu'>
                    {/* <div className='login-signup-div'> */}
                    <div className='login-div'
                        onClick={() => {
                            console.log("loginon click running````````````")
                            setShowLoginModal(true)
                        }
                        }
                        >
                         Log In
                    </div>
                     {/* </div> */}
                        <div className='signup-div'
                        onClick={() => {
                            console.log("signup clickruning!!!!!!!!!!!")
                            setShowSignupModal(true)

                        } }
                        >
                          Sign Up
                        </div>


                </div>)}


        </>
    )
}


export default LoginButton;

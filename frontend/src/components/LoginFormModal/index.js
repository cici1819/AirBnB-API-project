// frontend/src/components/LoginFormModal/index.js
import React from 'react';
 import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal({showLoginModal,setShowLoginModal}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <div className="login-in" onClick={() => setShowLoginModal(true)}></div> */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm setShowLoginModal={setShowLoginModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

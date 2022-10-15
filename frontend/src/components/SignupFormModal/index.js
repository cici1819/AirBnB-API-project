// frontend/src/components/signupModal/index.js
import React from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ showSignupModal, setShowSignupModal }) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <div className='sign-up' onClick={() => setShowSignupModal(true)}>
      </div> */}
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;

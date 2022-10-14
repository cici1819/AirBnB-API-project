import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import AddReviewForm from './AddReviewForm';

function AddReviewFormModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='add-review'>

                <button className='review-div' onClick={() => setShowModal(true)}>Add Review</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <AddReviewForm setShowModal={setShowModal}  />
                    </Modal>
                )}
            </div>
        </>
    );
}


export default AddReviewFormModal;

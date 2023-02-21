import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import EditReviewForm from './EditReviewForm';

function EditReviewFormModal({editReview}) {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='edit-review'>

                <button className='review-div1' onClick={() => setShowModal(true)}>Edit Review</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditReviewForm setShowModal={setShowModal} editReview={editReview} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default EditReviewFormModal;

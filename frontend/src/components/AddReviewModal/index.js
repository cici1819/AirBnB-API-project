import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import AddReviewForm from './AddReviewForm';

function AddReviewFormModal({spot}) {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='add-review'>

                <button className='review-div1' onClick={() => setShowModal(true)}>Add Review</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <AddReviewForm setShowModal={setShowModal} spot={spot} />
                    </Modal>
                )}
            </div>
        </>
    );
}


export default AddReviewFormModal;

import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import EditBookingForm from './EditBookingForm';

function EditBookingFormModal({booking,spot}) {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='edit-booking'>

                <button className='booking-edit-button' onClick={() => setShowModal(true)}>Edit Booking</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditBookingForm setShowModal={setShowModal} booking={booking} spot={spot} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default EditBookingFormModal;

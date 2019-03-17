import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const Modal = ({
    closeModal,
    title,
    children,
    isOpen
}) => {
    let modalRef = undefined;
    const setModalRef = (node) => {
        modalRef = node;
    };

    const onClickOutside = (event) => {
        if (modalRef && modalRef.contains(event.target)) return;
        closeModal();
    };

    const modal = ReactDOM.createPortal(
        <aside
            tag='aside'
            role='dialog'
            tabIndex='-1'
            aria-modal='true'
            className='modal-cover'
            onClick={onClickOutside}>
            <div className='modal-area' ref={setModalRef} data-testid='modal-window'>
                <div className="modal-title">{title}</div>
                <button
                    aria-label='Close Modal'
                    aria-labelledby='close-modal'
                    className='modal-close'
                    onClick={closeModal}>
                    X
                </button>
                <div className='modal-body'>
                    {children}
                </div>
            </div>
        </aside>,
        document.body
    );

    return isOpen ? modal : null;
};

export default Modal;

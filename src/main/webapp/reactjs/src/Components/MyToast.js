import React from 'react';
import { Toast, ToastContainer } from "react-bootstrap";

const MyToast = ({ show, message, type = 'success' }) => {
    return (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 10000 }}>
            <Toast 
                show={show} 
                delay={3000} 
                autohide 
                className={`border-0 shadow-lg text-white ${type === 'success' ? 'bg-success' : 'bg-danger'}`}
                style={{ borderRadius: '12px' }}
            >
                <Toast.Header closeButton={false} className={`${type === 'success' ? 'bg-success' : 'bg-danger'} text-white border-0 py-2 px-3`} style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                    <strong className="me-auto">{type === 'success' ? 'Succès' : 'Erreur'}</strong>
                    <small className="opacity-75">À l'instant</small>
                </Toast.Header>
                <Toast.Body className="py-3 px-3 fw-medium">
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default MyToast;
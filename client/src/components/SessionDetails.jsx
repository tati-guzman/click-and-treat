//Import necessary functionalities
import React from 'react';

const SessionDetails = ({ isOpen, onClose, selectedSession }) => {

    if (!isOpen) return null;

    console.log(selectedSession);
    
    //Future Goal: Add "Edit Session" button and functionality

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h1>Session Details</h1>

                <button onClick={onClose}>Close Details</button>
            </div>
        </div>
    )
}

export default SessionDetails;
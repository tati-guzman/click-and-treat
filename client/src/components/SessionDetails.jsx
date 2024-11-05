//Import necessary functionalities
import React from 'react';

const SessionDetails = ({ isOpen, onClose, selectedSession }) => {

    if (!isOpen) return null;

    console.log(selectedSession);

    //Function to format the date display
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };

    //Future Goal: Add "Edit Session" button and functionality

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h1>Session Details</h1>
                <p>Date: {formatDate(selectedSession.date)}</p>
                <p>Main Focus: Stage {selectedSession.stage}</p>
                <p>Tasks: {selectedSession.tasks ? selectedSession.tasks : "N/A"}</p>
                <p>Notes: {selectedSession.notes ? selectedSession.notes : "N/A"}</p>
                <p>Marked to Proceed? {selectedSession.proceed ? "Yes, ready for the next stage after this session!" : "No, maintained same stage!"}</p>

                <button onClick={onClose}>Close Details</button>
            </div>
        </div>
    )
}

export default SessionDetails;
import React, { useState } from 'react';
import "./JasmineDragonBox.css";

const ClockInPage = ({ PlayerNameReceieved }) => {
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the value entered in the tea input field
        const enteredPlayerName = e.target.elements.playerName?.value?.trim();

        // Check if the entered name is empty
        if (!enteredPlayerName) {
            setError('Please enter your name.');
            return;
        }

        // If the name is not empty, clear any existing error and proceed
        setError('');

        // Call the PlayerNameReceieved function to pass the entered name
        PlayerNameReceieved(enteredPlayerName);
    };

    return (
        // uses this class to create a box around
        <div className='JasmineTeaBox'>
            <h1>Welcome!</h1>
            <h3>Enter your name below:</h3>
            {/* simple form to take in name*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:
                        <input name="playerName" />
                    </label>
                </div>
                <button type="submit">Clock In</button>

                {/* Display error message if there's an error */}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default ClockInPage;

import React, { useState } from 'react';

function CompanyRegistration() {
    const [rollNumber, setRollNumber] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://20.244.45.144/train/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rollNumber,
                    accessCode
                })
            });

            if (response.ok) {
                setRegistrationStatus('Registration successful');
            } else {
                setRegistrationStatus('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setRegistrationStatus('An error occurred during registration');
        }
    };

    return (
        <div>
            <h2>Company Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Roll Number:</label>
                    <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>Access Code:</label>
                    <input
                        type="text"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>{registrationStatus}</p>
        </div>
    );
}

export default CompanyRegistration;

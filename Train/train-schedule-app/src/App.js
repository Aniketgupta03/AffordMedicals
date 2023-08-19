import React, { useState } from 'react';
import CompanyRegistration from './CompanyRegistration';
import AuthorizationToken from './AuthorizationToken';

function App() {
    const [rollNumber, setRollNumber] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');
    const [authorizationToken, setAuthorizationToken] = useState('');

    const handleRegistrationSubmit = async (e) => {
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

    const handleGetToken = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://20.244.144/train/auth', {
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
                const token = await response.text();
                setAuthorizationToken(token);
            } else {
                setAuthorizationToken('Token retrieval failed');
            }
        } catch (error) {
            console.error('Error during token retrieval:', error);
            setAuthorizationToken('An error occurred during token retrieval');
        }
    };

    return (
        <div className="App">
            <h1>John Doe Railway Company</h1>

            {/* Company Registration */}
            <div>
                <h2>Company Registration</h2>
                <form onSubmit={handleRegistrationSubmit}>
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

            {/* Authorization Token */}
            <div>
                <h2>Authorization Token</h2>
                <form onSubmit={handleGetToken}>
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
                    <button type="submit">Get Token</button>
                </form>
                <p>{authorizationToken}</p>
            </div>
        </div>
    );
}

export default App;

import React, { useState } from 'react';

function AuthorizationToken() {
    const [rollNumber, setRollNumber] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [authorizationToken, setAuthorizationToken] = useState('');

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
    );
}

export default AuthorizationToken;

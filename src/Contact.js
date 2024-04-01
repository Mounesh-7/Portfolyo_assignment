import React, { useState, useEffect } from 'react';
import './Contact.css';

function App() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setUserData(jsonData.user || {});
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App1">
            <center><h2 id='add'>Contact</h2></center>
            <div className="contact-info">
                <p><strong>Name:</strong> {userData.about && userData.about.name}</p>
                <p><strong>Email:</strong> {userData.about && userData.about.contactEmail}</p>
                <p><strong>Phone Number:</strong> {userData.about && userData.about.phoneNumber}</p>
                <p><strong>Address:</strong> {userData.about && userData.about.address}</p>
            </div>
        </div>
    );
}

export default App;



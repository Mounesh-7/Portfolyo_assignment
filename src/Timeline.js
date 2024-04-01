import React, { useState, useEffect } from 'react';
import './Timeline.css';

function App() {
    const [timelineData, setTimelineData] = useState([]);
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
                setTimelineData(jsonData.user.timeline || []);
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

    const educationTimeline = timelineData.filter(item => item.forEducation);
    const experienceTimeline = timelineData.filter(item => !item.forEducation);

    return (
        <div className="App2">
            <div className="education">
                <h2>Education</h2>
                <TimelineEntries entries={educationTimeline} />
            </div>
            <div className="experience">
                <h2>Experience</h2>
                <TimelineEntries entries={experienceTimeline} />
            </div>
        </div>
    );
}

const TimelineEntries = ({ entries }) => (
    <div>
        {entries.map(entry => (
            <div key={entry._id}>
                <h3>{entry.company_name}</h3>
                <p>{entry.jobTitle} - {entry.jobLocation}</p>
                <p>{entry.summary}</p>
                <ul>
                    {entry.bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);

export default App;

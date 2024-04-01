import React from 'react';
import './Skills.css';

function Skills({ skill1 }) {
    return (
        <div className="skills-section">
            <center><h2>Skills</h2></center>
            {skill1.map((skill, index) => (
                <div className="skill-item" key={index}>
                    <p><strong>Name:</strong> {skill.name}</p>
                    <p><strong>Sequence:</strong> {skill.sequence}</p>
                    <p><strong>Percentage:</strong> {skill.percentage}</p>
                    <img src={skill.image.url} alt="" />
                    <p><strong>_Id:</strong> {skill._id}</p>
                </div>
            ))}
        </div>
    );
}

export default Skills;



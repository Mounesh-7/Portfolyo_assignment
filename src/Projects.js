import React from 'react';
import './Projects.css';

function Projects({ project1 }) {
    return (
        <div className="projects-container">
            <center><h1>Projects</h1></center>
            {project1.map((project, index) => (
                <div key={index} className="project-card">
                    <p className="project-title">Title: {project.title}</p>
                    <p className="project-details">Sequence: {project.sequence}</p>
                    <p className="project-details">Public_Id: {project.image.public_id}</p>
                    <img src={project.image.url} alt="" className="project-image" />
                    <p className="project-description">Description: {project.description}</p>
                    <p className="project-tech-stack">TechStack: {project.techStack}</p>
                    <p className="project-details">_id: {project._id}</p>
                </div>
            ))}
        </div>
    );
}

export default Projects;


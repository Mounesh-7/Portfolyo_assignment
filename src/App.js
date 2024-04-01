import React, { useState, useEffect } from 'react';
import './App.css';
import Skills from './Skills';
import Projects from './Projects';
import Timeline from './Timeline';
import Testimonials from './component/Testimonals';
import Contact from './Contact';

function App() {
  const [userData, setUserData] = useState(null);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
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
        setUserData(jsonData.user.about);
        setServices(jsonData.user.services || []);
        setSkills(jsonData.user.skills || []);
        setProjects(jsonData.user.projects || []);
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
  if (!userData) return null;

  return (
    <div className="App">
      <center><h1>Build a Premium Dynamic Portfolio</h1></center>
      <div className="about-section">
        <h2>Hero and About:</h2>
        <div className="about-info">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Title:</strong> {userData.title}</p>
          <p><strong>Subtitle:</strong> {userData.subTitle}</p>
          <p><strong>Description:</strong> {userData.description}</p>
          <p><strong>Quote:</strong> {userData.quote}</p>
          <p><strong>Expiry Year:</strong> {userData.exp_year}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Some Total:</strong> {userData.some_total}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
          <p><strong>Email:</strong> {userData.contactEmail}</p>
          <p><strong>Public Id:</strong> {userData.avatar.public_id}</p>
          <img src={userData.avatar.url} alt="Avatar" id='image' />
        </div>
      </div>

      <div className="services-section">
        <h2>Services</h2>
        {services.map((service, index) => (
          <div className="service-item" key={service._id}>
            <h3>{service.name}</h3>
            <p><strong>Charge:</strong> {service.charge}</p>
            <p><strong>Description:</strong> {service.desc}</p>
            <img src={service.image.url} alt={service.name} />
          </div>
        ))}
      </div>

      <Skills skill1={skills} />
      <Projects project1={projects} />
      <Timeline />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default App;






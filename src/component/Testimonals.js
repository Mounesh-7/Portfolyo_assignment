import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
    const [testimonials, setTestimonials] = useState([]);
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
                setTestimonials(jsonData.user.testimonials || []);
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const appStyle = {
        textAlign: 'center',
        backgroundColor: '#F5F5F5',
        padding: '20px',
    };

    return (
        <div style={appStyle}>
            <h2>Testimonials:</h2>
            <Slider {...settings}>
                {testimonials.map(testimonial => (
                    <div key={testimonial._id}>
                        <img src={testimonial.image.url} alt={testimonial.name} />
                        <h2>{testimonial.name}</h2>
                        <p>{testimonial.review}</p>
                        <p>{testimonial.position}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default App;


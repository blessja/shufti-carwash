import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarWashList = () => {
  const [carWashes, setCarWashes] = useState([]);

  useEffect(() => {
    fetchCarWashes();
  }, []);

  // Function to fetch car washes
  const fetchCarWashes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/carwashes');
      setCarWashes(response.data);
    } catch (error) {
      console.error('Error fetching car washes:', error);
    }
  };

  // Render the car washes
  return (
    <div>
      <h1>Car Wash List</h1>
      {carWashes && carWashes.length > 0 ? (
        carWashes.map((carWash) => (
          <div key={carWash._id}>
            <Link to={`/${carWash._id}/dashboard`}><h3>{carWash.name}</h3></Link>
          </div>
        ))
      ) : (
        <p>No car washes found.</p>
      )}
    </div>
  );
};

export default CarWashList;

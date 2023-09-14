import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's profile data and populate the form
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        const { name, address, city, } = response.data;
        setName(name);
        setAddress(address);
        setCity(city);
      } catch (error) {
        // Handle error
      }
    };

    fetchProfile();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('/api/users/profile', { name, address, city });
      // Handle success
      console.log('Profile updated successfully:', response.data);

      // Redirect to the dashboard after successful profile update
      navigate('/user/dashboard');
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;

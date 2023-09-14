import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import Button from '@mui/material/Button';

const StaffDashboard = () => {
  const { carWashId } = useParams(); // Get the carwashId from the URL params
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate(`/${carWashId}/dashboard`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/carwashes/${carWashId}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [carWashId]);

  const handleRegisterCustomer = () => {
    navigate(`/register-customer/${carWashId}`);
  };

  return (
    <section>
      {/* <button onClick={handleLogout} style={{ background: 'none', border: '5px', color: '#4682B4', cursor: 'pointer' }}>Logout</button> */}
      <Button style={{ marginTop: '20px'}} onClick={handleLogout} variant="contained">Logout</Button>
      <div className="hd">
        <h2 className='stdb' style={{ color: '#4682B4', paddingBottom: '20px', marginTop: "30px", fontWeight: "600" }}>DASHBOARD</h2>
      </div>
      <div className="reg-btn">
        <button
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#4682B4',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '25px',
            textDecoration: 'none',
            marginBottom: '20px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleRegisterCustomer}
        >
         <Link to={`/register-customer/${carWashId}`} style={{ color: 'white', textDecoration: 'none' }}>
  Register New Customer
</Link>

        </button>
      </div>
      <div style={{ padding: '20px', background: '#DBE2ED', opacity: '1' }}>
        <h4 style={{ marginBottom: '20px', color: '#4682B4' }}>REGISTERED CUSTOMERS</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginRight: 'auto', justifyContent: 'center', marginLeft: 'auto', opacity: '0.7' }}>
          {users.map((user) => (
            <div
              className="user-card"
              key={user._id}
              style={{ width: '300px', background: '#4682B4', padding: '20px', borderRadius: '8px' }}
            >
              <Link to={`/users/${user._id}/${carWashId}`}>
                <UserCard user={user} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default StaffDashboard;

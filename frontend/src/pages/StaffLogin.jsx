import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carwashId = location.pathname.split('/').pop(); // Extract the car wash ID from the URL

  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const { phone, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/staff/${carwashId}/login`, {
        phone,
        password,
      });

      // Process the login response, e.g., store the token
      console.log('Staff login successful:', response.data);

      // Redirect to the staff dashboard or any other desired page
      navigate(`/staff/dashboard/${carwashId}`);
    } catch (error) {
      console.error('Error logging in as staff:', error);
      toast.error('Login failed');
    }
  };

  return (
    <>
      <section className="heading">
        <h1 style={{ fontSize: '23px', fontWeight: '600', paddingTop: '20px' }} className="login-title">
          LOG IN
        </h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="phone"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Cell Number"
              onChange={onChange}
              autoComplete="yes"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
              autoComplete="yes"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              LOG IN
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;

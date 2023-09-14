import axios from 'axios';

const API_URL = '/api/staff/';

// Register staff
const register = async (staffData) => {
  try {
    const response = await axios.post(API_URL, staffData);

    if (response.data) {
      localStorage.setItem('staff', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

// Login staff
const login = async (staffData, carwashId) => {
  try {
    const response = await axios.post(`${API_URL}${carwashId}/login`, staffData);

    if (response.data) {
      localStorage.setItem('staff', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

// Logout staff
const logoutStaff = () => {
  localStorage.removeItem('staff');
};

const staffService = {
  register,
  logoutStaff,
  login,
};

export default staffService;

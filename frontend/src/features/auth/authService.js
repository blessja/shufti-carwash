import axios from 'axios';

const API_URL = '/api/users/';

// Register user
const register = async (userData, carWashId) => {
  const response = await axios.post(API_URL, { ...userData, carWashId });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Get all users of a car wash
const getUsers = async (carWashId) => {
  try {
    const response = await axios.get(API_URL, { params: { carWashId } });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get user by id
const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Wash the user
const washUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/users/${userId}/wash`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
  getUsers,
  getUserById,
  washUser,
};

export default authService;

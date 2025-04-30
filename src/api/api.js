import axios from 'axios';

// Axios instance
const authApi = axios.create({
  baseURL: 'http://192.168.1.17:5000/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login Function
export const loginUser = async (email, password) => {
  try {
    const response = await authApi.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error(error); // Log the full error
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const signUpUser = async (firstName, lastName, email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    const response = await authApi.post('/signup', {
      firstName,
      lastName,
      email,
      password, 
    });
    return response.data;
  } catch (error) {
    console.error(error); 
    throw new Error(error.response?.data?.message || error.message);
  }
};

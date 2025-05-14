import axios from 'axios';

// Axios instance
const authApi = axios.create({
  baseURL: 'https://travelforall-backd.onrender.com/', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export const loginUser = async (email, password) => {
  try {
    const response = await authApi.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error(error); 
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
      passwordConfirm: confirmPassword, 
    });
    return response.data;
  } catch (error) {
    console.error(error); 
    throw new Error(error.response?.data?.message || error.message);
  }
};


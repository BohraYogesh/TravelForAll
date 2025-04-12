import axios from 'axios';

const currencyApi = axios.create({
  baseURL: 'https://api.frankfurter.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default currencyApi;

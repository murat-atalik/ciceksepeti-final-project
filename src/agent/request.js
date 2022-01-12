import axios from 'axios';

const request = axios.create({
  baseURL: 'https://fe-bootcamp-api.herokuapp.com/api/fe/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;

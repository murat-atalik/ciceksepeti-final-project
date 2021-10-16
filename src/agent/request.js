import axios from 'axios';

const request = axios.create({
  baseURL: 'http://bootcampapi.techcs.io/api/fe/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;

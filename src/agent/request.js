import axios from 'axios';

const request = axios.create({
  baseURL: 'http://bootcampapi.techcs.io/api/fe/v1',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;

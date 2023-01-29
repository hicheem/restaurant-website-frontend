import axios from 'axios';

export const axiosBase =  axios.create({
  baseURL: `http://192.168.1.8:3007/`
});

export const fetchBase = `http://192.168.1.8:3007/`;

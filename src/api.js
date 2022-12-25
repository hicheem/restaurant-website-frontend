import axios from 'axios';

export const axiosBase =  axios.create({
  baseURL: `http://192.168.1.10:3003/`
});

export const fetchBase = `http://192.168.1.10:3003/`;

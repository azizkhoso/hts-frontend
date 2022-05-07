/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const login = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/signup`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function signupStudent(data) {
  return login.post('/student', data);
}

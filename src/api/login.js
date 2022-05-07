import axios from 'axios';

const login = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/login`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function loginAdmin(data) {
  return login.post('/admin', data);
}

export function loginStudent(data) {
  return login.post('/student', data);
}

export function loginTeacher(data) {
  return login.post('/teacher', data);
}

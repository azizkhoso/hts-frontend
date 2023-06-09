/* eslint-disable no-underscore-dangle */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

const students = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin/students`,
});

// Adding interceptor so that on every request, authorization header should be available
students.interceptors.request.use((config) => {
  const updated = {
    ...config,
    headers: {
      ...config.headers,
      common: {
        ...config.headers.common,
        authorization: `Bearer ${localStorage.getItem('hts-token')}`,
      },
    },
  };
  return updated;
});

export function getStudents(page) {
  return students.get(`?page=${page}`);
}

export function deleteStudent(id) {
  return students.delete(`/${id}`);
}

export function getStudentSubmissions(id) {
  return students.get(`/${id}/tests`);
}
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import * as utils from '../../utils';

const student = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/student`,
});

// Adding interceptor so that on every request, authorization header should be available
student.interceptors.request.use((config) => {
  const updated = {
    ...config,
    headers: {
      ...config.headers,
      common: {
        ...config.headers.common,
        authorization: `Bearer ${utils.getToken()}`,
      },
    },
  };
  return updated;
});

export function getTests() {
  return student.get('/tests');
}

export function getTest(id) {
  return student.get(`/tests/${id}`);
}

export function submitTest(data) {
  return student.post('/submissions', data);
}

export default student;

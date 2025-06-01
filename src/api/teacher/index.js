/* eslint-disable no-underscore-dangle */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

const teacher = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/teacher`,
});

// Adding interceptor so that on every request, authorization header should be available
teacher.interceptors.request.use((config) => {
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

export function getAnnouncements() {
  return teacher.get('/announcements');
}

export function newAnnouncement(data) {
  return teacher.post('/announcements', data);
}

export function deleteAnnouncement(_id) {
  return teacher.delete(`/announcements/${_id}`);
}

export default teacher;

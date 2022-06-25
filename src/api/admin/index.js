/* eslint-disable no-underscore-dangle */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

const admin = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin`,
});

// Adding interceptor so that on every request, authorization header should be available
admin.interceptors.request.use((config) => {
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
  return admin.get('/announcements');
}

export function newAnnouncement(data) {
  return admin.post('/announcements', data);
}

export function deleteAnnouncement(_id) {
  return admin.delete(`/announcements/${_id}`);
}

export function getTests() {
  return admin.get('/tests');
}

export function getTest(_id) {
  return admin.get(`/tests/${_id}`);
}

export function newTest(data) {
  const fd = new FormData();
  fd.append('title', data.title);
  fd.append('subject', data.subject);
  fd.append('startsAt', data.startsAt);
  fd.append('submittableBefore', data.submittableBefore);
  fd.append('isDemo', Boolean(data.isDemo));
  fd.append('qualification', data.qualification);
  fd.append('questions', JSON.stringify(data.questions));
  data.questions.forEach((q) => fd.append('images', q.image || 'no image'));
  return admin.post('/tests', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function updateTest(data) {
  const fd = new FormData();
  fd.append('_id', data._id);
  fd.append('title', data.title);
  fd.append('subject', data.subject);
  fd.append('startsAt', data.startsAt);
  fd.append('submittableBefore', data.submittableBefore);
  fd.append('isDemo', data.isDemo === 'true');
  fd.append('qualification', data.qualification);
  fd.append('questions', JSON.stringify(data.questions));
  data.questions.forEach((q) => typeof q.image === 'object' && fd.append('images', q.image));
  return admin.post('/tests/update', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getSubmissions(testId) {
  return admin.get(`/submissions/${testId}`);
}

export function deleteTest(_id) {
  return admin.delete(`/tests/${_id}`);
}

export function getTestApplications(testId){
  return admin.get(`/test-applications/${testId}`);
}

export function updateTestApplications(data = { _id: 'undefined', approved: false }){
  return admin.put(`/test-applications/`, data);
}

export default admin;

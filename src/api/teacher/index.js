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

export function getTests() {
  return teacher.get('/tests');
}

export function getTest(_id) {
  return teacher.get(`/tests/${_id}`);
}

export function newTest(data) {
  const fd = new FormData();
  fd.append('title', data.title);
  fd.append('subject', data.subject);
  fd.append('startsAt', data.startsAt);
  fd.append('submittableBefore', data.submittableBefore);
  fd.append('isDemo', Boolean(data.isDemo));
  fd.append('price', data.price);
  fd.append('questions', JSON.stringify(data.questions));
  data.questions.forEach((q) => fd.append('images', q.image || 'no image'));
  return teacher.post('/tests', fd, {
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
  fd.append('price', data.price);
  fd.append('questions', JSON.stringify(data.questions));
  data.questions.forEach(
    (q) => typeof q.image === 'object' && fd.append('images', q.image),
  );
  return teacher.post('/tests/update', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getSubmissions(testId) {
  return teacher.get(`/submissions/${testId}`);
}

export function deleteTest(_id) {
  return teacher.delete(`/tests/${_id}`);
}

export function getTestApplications(testId) {
  return teacher.get(`/test-applications/${testId}`);
}

export function updateTestApplications(
  data = { _id: 'undefined', approved: false },
) {
  return teacher.put(`/test-applications/`, data);
}

export default teacher;

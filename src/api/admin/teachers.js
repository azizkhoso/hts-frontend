import axios from 'axios';

const adminTeachersApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin/teachers`,
});
// Adding interceptor so that on every request, authorization header should be available
adminTeachersApi.interceptors.request.use((config) => {
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

export function getTeachers(fullName = '', page = 1, limit = 10) {
  return adminTeachersApi.get(`?fullName=${fullName}&page=${page}&limit=${limit}`);
}

// add teacher endpoint
export function addTeacher(data) {
  return adminTeachersApi.post('/', data);
}

// update teacher endpoint
export function updateTeacher(id, data) {
  return adminTeachersApi.put(`/${id}`, data);
}

// delete teacher endpoint
export function deleteTeacher(id) {
  return adminTeachersApi.delete(`/${id}`);
}

// get teacher by id endpoint
export function getTeacherById(id) {
  return adminTeachersApi.get(`/${id}`);
}
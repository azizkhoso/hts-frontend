import axios from 'axios';
import queryString from 'query-string';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

/**
 * 
 * @param {Boolean} isImportant Fetch only important announcements if true
 */
export function getAnnouncements(isImportant) {
  return instance.get(`/announcements${isImportant ? '?isImportant=true' : ''}`);
}

export function getDemoTests(values) {
  /* Due to refetch of react query we get
    values = {
      queryKey: ['demo-tests', { subject: <value> }]
    }
  */
  return instance.get(`/demo-tests?${queryString.stringify(values.queryKey[1])}`);
}

export function getDemoTest(_id) {
  return instance.get(`/demo-tests/${_id}`);
}

export default instance;

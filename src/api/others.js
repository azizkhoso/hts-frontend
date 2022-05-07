import axios from 'axios';
import queryString from 'query-string';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export function getDemoTests(values) {
  /* Due to refetch of react query we get
    values = {
      queryKey: ['demo-tests', { subject: <value>, qualification: <value> }]
    }
  */
  return instance.get(`/demo-tests?${queryString.stringify(values.queryKey[1])}`);
}

export function getDemoTest(_id) {
  return instance.get(`/demo-tests/${_id}`);
}

export default instance;

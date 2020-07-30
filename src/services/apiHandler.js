import axios from 'axios';

let apiHandler = axios.create({
  baseURL: `http://localhost:3001/students`
});

export default apiHandler;

import axios from 'axios';
import Idx from 'idx';
import Connection from '../config/connection';

const AxiosInstance = axios.create({
  baseURL: `${Connection.getBaseUrl()}/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Add a request interceptor
AxiosInstance.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// Add a response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (Idx(error, (_) => _.response.data)) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;

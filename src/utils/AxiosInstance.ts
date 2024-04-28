import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  return accessToken;
};

export const deleteAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      deleteAccessToken();
      location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

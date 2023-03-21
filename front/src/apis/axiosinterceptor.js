import axios from "axios";
import { LOCAL_BASE_URL, LOCAL_FRONT_URL } from "../constants/url";

const api = axios.create({
  baseURL: LOCAL_BASE_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !error.config._isRetry) {
      error.config._isRetry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.get(
            `${LOCAL_BASE_URL}/api/auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          const newAccessToken = response.data;
          sessionStorage.setItem("accessToken", newAccessToken);

          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          window.location.href = `${LOCAL_FRONT_URL}/login`;
        }
      } else {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = `${LOCAL_FRONT_URL}/login`;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

/*
요청 샘플

import api from './api'; 

const postData = (data) => {
  api
    .post('/my', data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const data = { key1: 'value1', key2: 'value2' };
postData(data);
*/

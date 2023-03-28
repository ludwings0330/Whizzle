import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { parse, stringify } from "qs";
import { reissueAccessToken } from "./reissueToken";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

// 요청 인터셉터 -> 요청 보내기 전 수행할 로직
api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 -> 응답 받기 전 수행할 로직
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { config, response } = error;
    if (response.status === 401) {
      const originRequest = config;
      await reissueAccessToken().then(() => {
        originRequest.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
      });

      return axios(originRequest);
    }
    return Promise.reject(error);
  }
);

export default api;

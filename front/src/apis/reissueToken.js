import axios from "axios";
import { BASE_URL, LOCAL_FRONT_URL } from "../constants/constants";
import { parse, stringify } from "qs";
import { info } from "../components/notify/notify";

// 토큰 재발급 axios
const refreshAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

export const reissueAccessToken = async () => {
  refreshAxios.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("refreshToken");
  await refreshAxios
    .get("/api/auth/refresh")
    .then((response) => {
      console.log(response);
      localStorage.setItem("accessToken", response.data);
    })
    .catch((error) => {
      console.log(error);
      info("세션이 만료되었습니다. \n 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = `${LOCAL_FRONT_URL}/signin`;
    });
};

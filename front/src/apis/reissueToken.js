import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { parse, stringify } from "qs";
import Swal from "sweetalert2";

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
  refreshAxios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("refreshToken");
  await refreshAxios
    .get("/api/auth/refresh")
    .then((response) => {
      localStorage.setItem("accessToken", response.data);
    })
    .catch((error) => {
      localStorage.clear();
      Swal.fire({
        title: "세션이 만료되었습니다.",
        text: "다시 로그인해주세요",
        icon: "error",
        timer: 1500,
        customClass: {
          container: "my-swal-container",
          confirmButton: "my-swal-confirm-button",
          cancelButton: "my-swal-cancel-button",
          icon: "my-swal-icon",
        },
      }).then((result) => {
        window.location.href = `${BASE_URL}/signin`;
      });
    });
};

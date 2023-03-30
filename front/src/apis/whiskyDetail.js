import api from "./axiosInstance";
import { LOCAL_FRONT_URL } from "../constants/constants";

export const whiskyDetail = async (id) => {
  try {
    const res = await api.get(`/api/whiskies/${id}/any`);
    return res.data;
  } catch (error) {
    // window.location.href = `${LOCAL_FRONT_URL}/error`;
    console.log(error);
  }
};

export const getKeep = async (id) => {
  try {
    const res = await api.get(`/api/keeps/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const keepToggle = async (id) => {
  try {
    const res = await api.post(`/api/keeps/${id}`);
    console.log(res);
    console.log("킵 요청 성공");
  } catch (error) {
    console.log(error);
  }
};

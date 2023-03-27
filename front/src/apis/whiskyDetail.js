import api from "./axiosInstance";
import { LOCAL_FRONT_URL } from "../constants/constants";

export const whiskyDetail = async (id) => {
  try {
    const res = await api.get(`/api/whiskies/${id}/any`);
    return res.data;
  } catch (error) {
    window.location.href = `${LOCAL_FRONT_URL}/error`;
    console.log(error);
  }
};

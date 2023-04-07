import api from "./axiosInstance";

export const preferenceSave = async (data) => {
  try {
    const res = await api.post(`/api/members/preference`, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const recommend = async (data) => {
  try {
    const res = await api.post(`/api/rec/whisky/any`, data);
    return res.data;
  } catch (error) {}
};

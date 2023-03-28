import api from "./axiosInstance";

export const reviewCreate = async (data) => {
  try {
    const res = await api.post(`/api/reviews`, data);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reviewUpdate = async () => {
  try {
  } catch {}
};

export const reviewDelete = async () => {
  try {
  } catch {}
};

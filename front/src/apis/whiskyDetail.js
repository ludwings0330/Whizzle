import api from "./axiosInstance";

export const whiskyDetail = async (id) => {
  try {
    const res = await api.get(`/api/whiskies/${id}/any`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

import api from "./axiosInstance";

export const userInfo = async (id) => {
  try {
    const res = await api.get(`/api/members/${id}/any`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

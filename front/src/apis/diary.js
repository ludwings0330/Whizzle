import api from "./axiosInstance";

export const diaryCreate = async (data) => {
  try {
    const res = await api.post(`/api/diaries`, data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

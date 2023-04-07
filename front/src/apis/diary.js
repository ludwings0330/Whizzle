import api from "./axiosInstance";

export const diaryCreate = async (data) => {
  try {
    const res = await api.post(`/api/diaries`, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const diaryRead = async (data) => {
  try {
    const res = await api.get(`/api/diaries?month=${data}`);
    return res.data;
  } catch (error) {}
};

export const diaryUpdate = async (diaryId, diaryData) => {
  try {
    const res = await api.put(`/api/diaries/${diaryId}`, diaryData);
    return res.data;
  } catch (error) {}
};

export const diaryDelete = async (diaryId) => {
  try {
    const res = await api.delete(`/api/diaries/${diaryId}`);
    return true;
  } catch (error) {
    return false;
  }
};

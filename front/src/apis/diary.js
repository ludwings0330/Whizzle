import api from "./axiosInstance";

export const diaryCreate = async (data) => {
  try {
    const res = await api.post(`/api/diaries`, data);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const diaryRead = async (data) => {
  try {
    const res = await api.get(`/api/diaries?month=${data}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const diaryUpdate = async (data) => {
  try {
    const res = await api.put(`/api/diaries/${data.id}`, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return data;
  }
};

export const deleteDiary = async (diaryId) => {
  try {
    const res = await api.delete(`/api/diaries/${diaryId}`);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

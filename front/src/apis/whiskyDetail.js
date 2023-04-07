import api from "./axiosInstance";

export const whiskyDetail = async (id) => {
  try {
    const res = await api.get(`/api/whiskies/${id}/any`);
    return res.data;
  } catch (error) {}
};

export const getKeep = async (id) => {
  try {
    const res = await api.get(`/api/keeps/${id}`);
    return res.data;
  } catch (error) {}
};

export const keepToggle = async (id) => {
  try {
    await api.post(`/api/keeps/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const getStatistics = async (id) => {
  try {
    const res = await api.get(`/api/whiskies/${id}/statistics/any`);
    return res.data;
  } catch (error) {}
};

export const getSimilar = async (id) => {
  try {
    const res = await api.get(`/api/similar-whisky/${id}/any`);
    return res.data;
  } catch (error) {}
};

export const getReview = async (id, data) => {
  try {
    const res = await api.get(`/api/reviews/whiskies/${id}/any`, { params: data });
    return res.data;
  } catch (error) {}
};

export const getMyReview = async (id) => {
  try {
    const res = await api.get(`/api/reviews/whiskies/${id}/my`);
    return res.data;
  } catch (error) {}
};

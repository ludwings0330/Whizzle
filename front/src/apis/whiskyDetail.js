import api from "./axiosInstance";

export const whiskyDetail = async (id) => {
  try {
    const res = await api.get(`/api/whiskies/${id}/any`);
    return res.data;
  } catch (error) {
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

export const getStatistics = async (id) => {
  try {
    const res = await api.get(`/api/whiskies/${id}/statistics/any`);
    console.log("선호 통계 조회 성공");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSimilar = async (id) => {
  try {
    const res = await api.get(`/api/similar-whisky/${id}/any`);
    console.log("유사 위스키 조회 성공");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

import api from "./axiosInstance";

export const whiskyDetail = async (id) => {
  try {
    const res = await api.get(`/api/whiskies/${id}/any`);
    console.log("상세 정보 조회 성공");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getKeep = async (id) => {
  try {
    const res = await api.get(`/api/keeps/${id}`);
    console.log("킵 여부 조회 성공");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const keepToggle = async (id) => {
  try {
    await api.post(`/api/keeps/${id}`);
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

export const getReview = async (id, data) => {
  try {
    const res = await api.get(`/api/reviews/whiskies/${id}/any`, { params: data });
    console.log("리뷰 조회 성공");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyReview = async (id) => {
  try {
    const res = await api.get(`/api/reviews/whiskies/${id}/my`);
    console.log("나의 리뷰 조회 성공");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

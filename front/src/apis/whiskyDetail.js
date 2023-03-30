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

export const getReview = async (data) => {
  const { id, baseId, reviewOrder } = data;
  try {
    const res = await api.get(
      `/api/reviews/whiskies/${id}/any?baseId=${baseId}&reviewOrder=${reviewOrder}`
    );
    console.log("리뷰 조회 성공");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

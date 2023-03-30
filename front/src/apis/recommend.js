import api from "./axiosInstance";

export const preferenceSave = async (data) => {
  try {
    const res = await api.post(`/api/members/preference`, data);
    console.log("취향 정보 저장 성공");
    return true;
  } catch (error) {
    console.log("취향 정보 저장 실패");
    return false;
  }
};

export const recommend = async (data) => {
  try {
    const res = await api.post(`/api/rec/whisky/any`, data);
    console.log("추천 결과 성공");
    return res.data;
  } catch (error) {
    console.log("추천 결과 실패");
    console.log(error);
  }
};

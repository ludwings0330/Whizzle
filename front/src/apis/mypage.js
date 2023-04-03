import api from "./axiosInstance";

export const keepApi = async (params) => {
  try {
    const res = await api.get(`/api/keeps/whiskies/any`, { params: params });
    // console.log(res. data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const reviewApi = async (id, params) => {
  try {
    const res = await api.get(`/api/reviews/members/${id}/any`, { params: params });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const badgeApi = async (id, params) => {
  try {
    const res = await api.get(`/api/members/${id}/badges/any`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const nicknameChangeApi = async (newNickname) => {
  try {
    const formData = new FormData();
    formData.append("nickname", newNickname);

    const response = await api.put(`/api/members`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const profileChangeApi = async (profileImageFile) => {
  try {
    const formData = new FormData();
    formData.append("profileImageFile", profileImageFile);

    const response = await api.put(`api/members`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error; // 오류를 던져서 에러 핸들링이 가능하도록 합니다.
  }
};

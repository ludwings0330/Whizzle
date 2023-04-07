import api from "./axiosInstance";

export const keepApi = async (params) => {
  try {
    const res = await api.get(`/api/keeps/whiskies/any`, { params: params });
    return res.data;
  } catch (error) {}
};

export const reviewApi = async (id, params) => {
  try {
    const res = await api.get(`/api/reviews/members/${id}/any`, { params: params });
    return res.data;
  } catch (error) {}
};

export const badgeApi = async (id, params) => {
  try {
    const res = await api.get(`/api/members/${id}/badges/any`);
    return res.data;
  } catch (error) {}
};

export const nicknameChangeApi = async (nickname) => {
  try {
    const formData = new FormData();
    formData.append("nickname", nickname);

    await api.put(`/api/members`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const profileChangeApi = async (profileImageFile) => {
  try {
    const formData = new FormData();
    formData.append("profileImageFile", profileImageFile);

    const res = await api.put(`api/members`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    return false;
  }
};

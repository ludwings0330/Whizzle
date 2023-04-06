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
    console.log(error);
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
    console.log(error);
    return false;
  }
};

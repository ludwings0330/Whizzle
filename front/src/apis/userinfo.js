import api from "./axiosInstance";

export const userInfo = async (id) => {
  try {
    const res = await api.get(`/api/members/${id}/any`);
    return res.data;
  } catch (error) {}
};

export const getPreference = async (id) => {
  try {
    const res = await api.get(`/api/members/${id}/preference/any`);
    return res;
  } catch (error) {}
};

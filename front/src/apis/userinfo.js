import api from "./axiosInstance";

export const userInfo = async (id) => {
  console.log(id);

  try {
    const res = await api.get(`/api/members/${id}/any`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPreference = async (id) => {
  try {
    const res = await api.get(`/api/members/${id}/preference/any`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

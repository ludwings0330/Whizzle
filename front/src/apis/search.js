import api from "./axiosInstance";

export const getAutocomplete = async (word) => {
  try {
    const res = await api.get(`/api/whiskies/suggest/${word}/any`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

import api from "./axiosInstance";

export const getAutocomplete = async (word) => {
  try {
    const res = await api.get(`/api/whiskies/suggest/${word}/any`);
    return res.data;
  } catch (error) {}
};

export const getsearchWhisky = async (data) => {
  const { word, offset, size } = data;
  try {
    const res = await api.get(
      `/api/whiskies/search/any?word=${word}&lastOffset=${offset}&size=${size}`
    );
    return res.data;
  } catch (error) {}
};

export const getsearchWhiskyCount = async (word) => {
  try {
    const res = await api.get(`/api/whiskies/count/any?word=${word}`);
    return res.data;
  } catch (error) {}
};

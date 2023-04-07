import api from "./axiosInstance";

export const keepApi = async (id) => {
  try {
    const res = await api.post(`/api/keeps/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

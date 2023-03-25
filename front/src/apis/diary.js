import api from "./axiosInstance";

export const diaryCreate = async (data) => {
  try {
    const res = await api.post(`/api/diaries`, data);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const diaryRead = async (data) => {
  try {
    const res = await api.get(`/api/diaries?month=${data}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [
      {
        id: 4956419,
        date: "2023-03-24",
        emotion: "GOOD",
        drinkLevel: "MODERATE",
        content: "23@",
        drinks: [
          {
            whisky: {
              id: 2,
              name: "Highland Park 18 Year",
            },
            drinkOrder: 0,
          },
        ],
      },
    ];
  }
};

export const diaryUpdate = async (data) => {
  try {
    const res = await api.put(`/api/diaries/${data.id}`, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return data;
  }
};

export const deleteDiary = async (diaryId) => {
  try {
    const response = await api.delete(`/api/diaries/${diaryId}`);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

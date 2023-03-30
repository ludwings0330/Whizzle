import { atom } from "recoil";
import { diaryRead } from "../apis/diary";

export const diaryState = atom({
  key: "diaryState",
  default: [],
});

export const diaryDataState = atom({
  key: "diaryDataState",
  default: {
    id: null,
    date: "",
    today: "",
    emotion: "",
    drinkLevel: "",
    content: "",
    drinks: [
      {
        whisky: {
          id: null,
          name: "",
        },
        drinkOrder: null,
      },
    ],
  },
});

export const currentComponentState = atom({
  key: "currentComponentState",
  default: "diaryEditor",
});

export const fetchDiaries = async (setDiaryList, setData, selectDate) => {
  try {
    selectDate = selectDate.replaceAll(".", "-");
    const currentYearMonthDate = selectDate.substring(0, 7);
    const diaries = await diaryRead(currentYearMonthDate);
    setDiaryList(diaries);
    console.log(diaries);

    let found = false;
    diaries.forEach((diary) => {
      const diaryDate = diary.date;
      if (diaryDate === selectDate) {
        setData(diary);
        found = true;
      }
    });

    return found;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const preference = atom({
  key: "preference",
  default: {
    gender: "",
    age: "",
    price: "",
    isExperience: "",
    whiskies: [],
    flavor: {
      smoky: 0,
      peaty: 0,
      spicy: 0,
      herbal: 0,
      oily: 0,
      body: 0,
      rich: 0,
      sweet: 0,
      salty: 0,
      vanilla: 0,
      tart: 0,
      fruity: 0,
      floral: 0,
    },
  },
});

export const recommendResult = atom({
  key: "recommendResult",
  default: [],
});

export const dailyPreference = atom({
  key: "dailyPreference",
  default: {
    price: "",
    flavor: {
      smoky: 0,
      peaty: 0,
      spicy: 0,
      herbal: 0,
      oily: 0,
      body: 0,
      rich: 0,
      sweet: 0,
      salty: 0,
      vanilla: 0,
      tart: 0,
      fruity: 0,
      floral: 0,
    },
  },
});

export const searchData = atom({
  key: "searchData",
  default: [],
});

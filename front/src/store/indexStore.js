import { atom } from "recoil";
import { diaryRead } from "../apis/diary";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

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
    drinks: [],
  },
});

export const searchTerm = atom({
  key: "searchTerm",
  default: [],
});

export const currentComponentState = atom({
  key: "currentComponentState",
  default: "diaryEditor",
});

export const fetchDiaries = async (setDiaryList, setData, selectDate) => {
  try {
    const currentYearMonthDate = `${selectDate.getFullYear()}-${
      selectDate.getMonth() < 10 ? "0" : ""
    }${selectDate.getMonth() + 1}`;

    const diaries = await diaryRead(currentYearMonthDate);

    setDiaryList(diaries);

    const year = selectDate.getFullYear();
    const month = selectDate.getMonth() + 1;
    const day = selectDate.getDate();

    const clickedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;

    let found = false;
    if (diaries) {
      diaries.forEach((diary) => {
        const diaryDate = diary.date;
        if (diaryDate === clickedDate) {
          setData((prev) => {
            return { ...prev, ...diary };
          });
          found = true;
        }
      });
    }
    return found;
  } catch (error) {
    return false;
  }
};

export const preference = atom({
  key: "preference",
  default: {
    gender: "",
    age: "",
    priceTier: 0,
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
    saved: false,
    re: true,
  },
  effects_UNSTABLE: [persistAtom],
});

export const recommendResult = atom({
  key: "recommendResult",
  default: [],
  effects_UNSTABLE: [persistAtom],
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

export const reviewState = atom({
  key: "reviewState",
  default: {},
});

export const showAllState = atom({
  key: "showAllState",
  default: false,
});

export const isMobileState = atom({
  key: "isMobileState",
  default: window.innerWidth <= 800,
});

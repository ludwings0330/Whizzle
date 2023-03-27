import { atom } from "recoil";
import { diaryRead } from "../apis/diary";

export const diaryState = atom({
  key: "diaryState",
  default: {},
});

export const dataState = atom({
  key: "dataState",
  default: {
    id: 0,
    date: "",
    emotion: "",
    drinkLevel: "",
    content: "",
    drinks: [
      {
        whisky: {
          id: 0,
          name: "",
        },
        drinkOrder: 0,
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

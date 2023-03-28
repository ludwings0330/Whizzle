import { atom } from "recoil";
import { diaryRead } from "../apis/diary";

export const diaryState = atom({
  key: "diaryState",
  default: {},
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
    background: "",
  },
});

export const calanderData = atom({
  key: "calanderData",
  default: [],
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

import { atom } from "recoil";

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

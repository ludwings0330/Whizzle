import { atom } from "recoil";

export const preference = atom({
  key: "preference",
  default: {
    gender: "",
    age: "",
    price: "",
    isExperience: "",
    whiskies: [],
    flavor: null,
  },
});

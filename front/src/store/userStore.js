import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    nickname: "",
    email: "",
    provider: "",
    exp: 0,
  },
});

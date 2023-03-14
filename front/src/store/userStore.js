import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    nickname: "",
    email: "",
    provider: 0,
    exp: 0,
  },
});

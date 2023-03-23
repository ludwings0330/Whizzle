import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: 0,
    exp: 0,
    nickname: "",
    email: "",
    provider: "",
    image: {
      url: "",
      originName: "",
    },
    level: 0,
  },
});

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
  effects_UNSTABLE: [persistAtom],
});

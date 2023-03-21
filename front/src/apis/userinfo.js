import api from "./axiosinterceptor";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/userStore";

export const UserInfo = (id) => {
  const setUser = useSetRecoilState(userState);

  api
    .get(`/api/members/${id}/any`)
    .then((res) => {
      const newUserData = {
        ...userState,
        nickname: res.data.nickname,
        email: res.data.email,
        provider: res.data.provider,
        image: res.data.image,
        level: res.data.level,
      };
      console.log(`res.data : ${res.data}`);
      console.log(`new user : ${newUserData}`);
      setUser(newUserData);
    })
    .catch((error) => {
      console.log(error);
    });
};

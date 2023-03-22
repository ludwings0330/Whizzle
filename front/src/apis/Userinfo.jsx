import api from "./axiosInterceptor";
import { useRecoilState } from "recoil";
import { userState } from "../store/userStore";

const UserInfo = (id) => {
  const [user, setUser] = useRecoilState(userState);

  api
    .get(`/api/members/${id}/any`)
    .then((res) => {
      const newUserData = {
        ...user,
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

export default UserInfo;

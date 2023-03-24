import { useSetRecoilState } from "recoil";
import { userState } from "../store/userStore";

function Logout() {
  const setUser = useSetRecoilState(userState);

  const logout = () => {
    // 토큰 삭제
    localStorage.clear();

    // useState 초기화
    setUser({
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
    });
  };

  return logout;
}

export default Logout;

import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/userStore";

function Logout() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const logout = () => {
    // 토큰 삭제
    localStorage.clear();

    // useState 초기화
    setUser({
      id: 0,
      nickname: "",
      email: "",
      provider: "",
      image: {
        url: "",
        originName: "",
      },
      level: 0,
    });

    // 로그인 페이지로 redirect
    navigate("/login");
  };

  return logout;
}

export default Logout;

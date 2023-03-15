import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/userStore";

function Logout() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const logout = () => {
    // 토큰 삭제
    sessionStorage.clear();

    // useState 초기화
    setUser({
      nickname: "",
      email: "",
      provider: "",
      exp: 0,
    });

    // 로그인 페이지로 redirect
    navigate("/login");
  };

  return logout;
}

export default Logout;

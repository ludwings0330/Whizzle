import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/userStore";
import jwtDecode from "jwt-decode";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const setUser = useSetRecoilState(userState);

  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");
  const isNew = queryParams.get("isNew") === "true";

  function setting() {
    try {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      // access 토큰의 payload에서 유저 정보 추출 후, 전역 변수로 저장
      const jwt = jwtDecode(accessToken);
      setUser((prev) => ({
        ...prev,
        nickname: jwt.nickname,
        email: jwt.email,
        provider: jwt.provider,
        exp: jwt.exp,
      }));
    } catch (error) {
      console.log("Token 저장 실패");
    }
  }

  useEffect(() => {
    setting();

    if (isNew) {
      navigate("/recommend/question");
    } else {
      navigate("/");
    }
  }, []);

  return null;
};

export default Callback;

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const accessToken = queryParams.get("accessToken");
  // access 토큰의 payload에서 유저 정보 추출 후, 전역 변수로 저장 필요
  const refreshToken = queryParams.get("refreshToken");
  const isNew = queryParams.get("isNew") === "true";

  function setting() {
    try {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
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

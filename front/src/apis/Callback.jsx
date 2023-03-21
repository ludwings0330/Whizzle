import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/userStore";
import jwtDecode from "jwt-decode";
import { UserInfo } from "./userinfo";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);

  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");
  const isNew = queryParams.get("isNew") === "true";

  function setting() {
    try {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      // JWT 파싱하여 유저 id와 exp를 저장
      const jwt = jwtDecode(accessToken);
      const newUser = {
        ...user,
        id: jwt.memberId,
        exp: jwt.exp,
      };
      setUser(newUser);
      // user Id값을 통해 user 정보를 가져오는 axios 요청
      UserInfo(jwt.memberId);
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

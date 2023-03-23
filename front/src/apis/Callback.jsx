import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../store/userStore";
import jwtDecode from "jwt-decode";
import { userInfo } from "./userinfo";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [user, setUser] = useRecoilState(userState);

  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");
  const isNew = queryParams.get("isNew") === "true";
  const jwt = jwtDecode(accessToken);

  // 토큰 저장
  function setToken() {
    try {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // JWT 파싱하여 유저 id와 exp를 저장
      const newUser = {
        ...user,
        id: jwt.memberId,
        exp: jwt.exp,
      };
      setUser(newUser);
    } catch (error) {
      console.log("토큰 저장 실패");
    }
  }

  // user Id값을 통해 user 정보를 가져오는 axios 요청
  async function getUserInfo() {
    try {
      const newUser = await userInfo(jwt.memberId);
      const newUserData = {
        id: user.id,
        exp: user.exp,
        nickname: newUser.nickname,
        email: newUser.email,
        provider: newUser.provider,
        image: newUser.image,
        level: newUser.level,
      };
      console.log(newUserData);
      setUser(newUserData);
    } catch (error) {
      console.log("유저 정보 저장 실패");
    }
  }

  useEffect(() => {
    setToken();
    getUserInfo();

    if (isNew) {
      navigate("/recommend/question");
    } else {
      navigate("/");
    }
  }, []);

  return null;
};

export default Callback;

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/userStore";
import jwtDecode from "jwt-decode";
import { userInfo } from "./userinfo";
import { preference } from "../store/indexStore";
import { useRecoilValue } from "recoil";
import { preferenceSave } from "../apis/recommend";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const setUser = useSetRecoilState(userState);
  const preferenceValue = useRecoilValue(preference);

  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");
  const isNew = queryParams.get("isNew") === "true";
  const jwt = jwtDecode(accessToken);

  // 토큰 저장
  function setToken() {
    try {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.log("토큰 저장 실패");
    }
  }

  // user Id값을 통해 user 정보를 가져오는 axios 요청
  async function getUserInfo() {
    try {
      const newUser = await userInfo(jwt.memberId);
      const newUserData = {
        id: jwt.memberId, // JWT 파싱하여 유저 id와 exp를 저장
        exp: jwt.exp,
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

  async function savePrefInfo() {
    const saveData = {
      gender: preferenceValue.gender,
      age: preferenceValue.age,
      priceTier: Number(preferenceValue.price),
      flavor: preferenceValue.flavor,
    };
    try {
      await preferenceSave(saveData);
      console.log("신규유저 취향저장 성공");
    } catch {
      console.log("신규유저 취향저장 실패");
    }
  }

  useEffect(() => {
    setToken();
    getUserInfo();

    if (isNew) {
      if (preferenceValue.age) {
        savePrefInfo();
      }
      navigate("/recommend/question");
    } else {
      navigate("/");
    }
  }, []);

  return null;
};

export default Callback;

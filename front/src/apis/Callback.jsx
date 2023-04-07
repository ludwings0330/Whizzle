import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../store/userStore";
import jwtDecode from "jwt-decode";
import { getPreference, userInfo } from "./userinfo";
import { preference } from "../store/indexStore";
import { preferenceSave } from "../apis/recommend";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const setUser = useSetRecoilState(userState);
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);

  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");
  const [isNew, setIsNew] = useState(queryParams.get("isNew") === "true");
  const jwt = jwtDecode(accessToken);

  // 토큰 저장
  function setToken() {
    try {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {}
  }

  // user Id값을 통해 user 정보를 가져오는 axios 요청
  async function getUserInfo() {
    try {
      const newUser = await userInfo(jwt.memberId);
      // 저장된 입맛정보 없으면 가져오기를 시도해봄. 있으면 그대로 둔다!
      if (!preferenceValue.age) {
        await getPreference(jwt.memberId)
          .then((response) => {
            if (response.status === 204) {
              // 존재하는게 없다면
              setPreferenceValue((prev) => {
                return { ...prev, re: true };
              });
              // 입맛 정보가 없으면 신규 회원이나 다름없는 취급
              setIsNew(true);
            } else if (response.status == 200) {
              // 존재한다면 입맛 정보 저장
              setPreferenceValue((prev) => {
                return { ...prev, ...response.data, re: false };
              });
            }
          })
          .catch((e) => e);
      }
      const newUserData = {
        id: jwt.memberId, // JWT 파싱하여 유저 id와 exp를 저장
        exp: jwt.exp,
        nickname: newUser.nickname,
        email: newUser.email,
        provider: newUser.provider,
        image: newUser.image,
        level: newUser.level,
      };
      setUser(newUserData);
    } catch (error) {}
  }

  async function savePrefInfo() {
    const saveData = {
      gender: preferenceValue.gender,
      age: preferenceValue.age,
      priceTier: preferenceValue.priceTier,
      flavor: preferenceValue.flavor,
    };
    try {
      await preferenceSave(saveData);
      setPreferenceValue((prev) => {
        return { ...prev, re: false };
      });
    } catch {}
  }

  useEffect(() => {
    setToken();
    getUserInfo();

    if (isNew || preference.age) {
      savePrefInfo();
      navigate("/recommend/question");
    } else {
      navigate("/");
    }
  }, []);

  return null;
};

export default Callback;

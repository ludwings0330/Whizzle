import { useSetRecoilState } from "recoil";
import { userState } from "../store/userStore";
import { useState } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

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

  useState(() => {
    navigate("/signin");
  }, []);

  return logout;
}

export default Logout;

import React, { useEffect } from "react";
import styled from "styled-components";
import { BASE_URL } from "../constants/constants";

import kakao from "../assets/img/kakao.png";
import naver from "../assets/img/naver.png";
import google from "../assets/img/google.png";
import loginBackground from "../assets/img/loginBackground.png";

const SImg = styled.img`
  width: 250px;
  height: 55px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${loginBackground});
  background-repeat: no-repeat;
`;

const SP = styled.p`
  font-size: 20px;
  color: white;
`;

const AppLogin = () => {
  // footer 제거하는 로직
  useEffect(() => {
    const footer = document.getElementById("footer");
    footer.style.display = "none";

    return () => {
      footer.style.display = "flex";
    };
  });

  const onClickHandler = (e) => {
    const clicked = e.target.alt;
    window.location.href = `${BASE_URL}/oauth2/authorization/${clicked}`;
  };

  return (
    <>
      <SDiv>
        <SP style={{ fontSize: "32px", marginBottom: "0px", fontWeight: "bold" }}>
          Login to Your Account
        </SP>
        <SP>login with social networks</SP>
        <SImg src={naver} alt="naver" onClick={onClickHandler} />
        <SImg src={kakao} alt="kakao" onClick={onClickHandler} />
        <SImg style={{ borderRadius: "3px" }} src={google} alt="google" onClick={onClickHandler} />
      </SDiv>
    </>
  );
};

export default AppLogin;

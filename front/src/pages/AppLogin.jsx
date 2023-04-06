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
  width: 100vw;
  background-image: linear-gradient(90deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
`;

const SInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  height: 100vh;
  width: 100vw;
  background: url(${loginBackground}) center center / cover no-repeat;
  @media screen and (max-width: 1000px) {
    background: none;
  }
`;

const SP = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 40px;
  color: white;
  font-family: GmarketSansLight;
  line-height: 50px;
  @media screen and (max-width: 1000px) {
    font-size: 30px;
    line-height: 40px;
  }
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
        <SInnerDiv>
          <SP>
            <span style={{ fontFamily: "GmarketSansBold" }}>위즐리</span>가 되어
          </SP>
          <SP style={{ marginBottom: "50px" }}>위스키를 즐겨보세요!</SP>
          {/* <SP>login with social networks</SP> */}
          <SImg src={naver} alt="naver" onClick={onClickHandler} />
          <SImg src={kakao} alt="kakao" onClick={onClickHandler} />
          <SImg
            style={{ borderRadius: "3px" }}
            src={google}
            alt="google"
            onClick={onClickHandler}
          />
        </SInnerDiv>
      </SDiv>
    </>
  );
};

export default AppLogin;

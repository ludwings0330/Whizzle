import React from "react";
import styled from "styled-components";

// 버튼 import
import kakao from "../assets/img/kakao.png";
import naver from "../assets/img/naver.png";
import google from "../assets/img/google.png";

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
  height: 80vh;
`;

const AppLogin = () => {
  const onClickHandler = (e) => {
    const clicked = e.target.alt;

    if (clicked === "naver") {
      console.log(`${clicked} 로그인`);
    } else if (clicked === "kakao") {
      console.log(`${clicked} 로그인`);
    } else if (clicked === "google") {
      console.log(`${clicked} 로그인`);
    }
  };

  return (
    <>
      <SDiv>
        <SImg src={naver} alt="naver" onClick={onClickHandler} />
        <SImg src={kakao} alt="kakao" onClick={onClickHandler} />
        <SImg src={google} alt="google" onClick={onClickHandler} />
      </SDiv>
    </>
  );
};

export default AppLogin;

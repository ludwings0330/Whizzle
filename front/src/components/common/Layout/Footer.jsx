import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import footerLogo from "../../../assets/img/footer_logo.png";
import animationData from "../../../assets/img/lotties/drinking-bear.json";

const SDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 100px 0px;
`;

const SInnerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  width: 70%;
`;

const SImg = styled.img`
  width: 150px;
`;

const STitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #949494;
`;

const SContent = styled.p`
  font-size: 14px;
  color: #949494;
  @media screen and (max-width: 1119px) {
    font-size: 10px;
  }
`;

//푸터
const Footer = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <SDiv id="footer">
      <Lottie
        animationData={animationData}
        style={{ position: "absolute", height: "150px", zIndex: 1, top: -99, right: 0 }}
      />
      <SInnerDiv>
        <div>
          <SImg src={footerLogo} alt="footer_logo.png" />
          <SContent>(주) drunkenbear | Sponsored by. SSAFY</SContent>
          <SContent>만든 사람들 | 이다운 배창민 이예진 정지은 최은성 황준현</SContent>
          <SContent>Copyright ©2023 drunkenbear. All rights reserved.</SContent>
        </div>
        <div>
          <STitle>주요기능</STitle>
          <SContent>위스키 추천</SContent>
          <SContent>위스키 다이어리</SContent>
          <SContent>위스키 검색</SContent>
        </div>
        <div>
          <STitle>고객센터</STitle>
          <SContent>이메일 : yejinlee0707@gmail.com</SContent>
          <SContent>전화번호 : 010-6430-9492</SContent>
          <SContent>주소 : 역삼동 테헤란로 212</SContent>
        </div>
        <div>
          <STitle>이용약관</STitle>
          <STitle>개인정보처리방침</STitle>
        </div>
      </SInnerDiv>
    </SDiv>
  );
};

export default Footer;

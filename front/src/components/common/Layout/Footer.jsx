import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import footerLogo from "../../../assets/img/footer_logo.png";
import animationData from "../../../assets/img/lotties/drinking-bear.json";

const SDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: start;
  background-color: #f9f9f9;
  padding: 100px 250px;
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
        options={defaultOptions}
        height={200}
        width={200}
        style={{ position: "absolute", zIndex: 1, top: -130, right: 0 }}
      />
      <div>
        <SImg src={footerLogo} alt="footer_logo.png" />
        <SContent>(주) drunkenbear | 대표: 내맘대로 이예진</SContent>
        <SContent>Copyright ©2023 drunkenbear. All rights reserved.</SContent>
      </div>
      <div>
        <STitle>깃허브</STitle>
        <SContent>노션</SContent>
        <SContent>또뭐있지</SContent>
        <SContent>무튼 로고추가</SContent>
      </div>
      <div>
        <STitle>깃허브</STitle>
        <SContent>노션</SContent>
        <SContent>또뭐있지</SContent>
        <SContent>무튼 로고추가</SContent>
      </div>
      <div>
        <STitle>깃허브</STitle>
        <SContent>노션</SContent>
        <SContent>또뭐있지</SContent>
        <SContent>무튼 로고추가</SContent>
      </div>
    </SDiv>
  );
};

export default Footer;

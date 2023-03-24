import React from "react";
import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import mainRecommendImg from "../../assets/img/main_recommend.jpg";
import whisky from "../../assets/img/whisky_preset/13.png";

const SBackImg = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background: url(${mainRecommendImg}) center center / cover no-repeat;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const SContainer = styled.div`
  display: flex;
  align-items: end;
  padding-top: 70px;
  padding-left: 129px;
  height: 730px;
`;

const SWhiskyImg = styled.img`
  cursor: pointer;
  margin-right: 80px;
  height: 100%;
  transition: 0.5s;
  transform-origin: bottom;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s;
  }
`;

const STextCon = styled.div`
  height: 356px;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  margin-bottom: 50px;
`;

const SRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const blink = keyframes`
  from {
    border-right: 3px solid #fff;
  }
  to {
    border-right: 3px solid #777;
  }
`;

const SText = styled.div`
  font-family: GmarketSansLight;
  font-size: 40px;
  line-height: 1.5;
  letter-spacing: -2px;
  color: white;
  padding-bottom: 50px;
  white-space: pre-line;
  &::after {
    content: "";
    margin-left: 0.6rem;
    border-right: 2px solid #777;
    animation: ${blink} 0.9s infinite steps(2);
  }
`;

const SUserName = styled.span`
  font-family: GmarketSansBold;
  background-image: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

//메인화면에 띄워줄 추천부분(비로그인 사용자)
const MainRecommend = () => {
  const userName = "이예진짱";
  const userNameLen = userName.length;

  const whiskyName = "블랙라벨";
  const whiskyNameLen = whiskyName.length;

  const textRef = useRef(null);
  const [text, setText] = useState("");
  const letters = `안녕녕하세요. ${userName}님, \n 위즐에 오신 것을 환영합니다 ! \n \n 오늘의 위스키를 추천해드릴게요. \n 왼쪽의 위스키 사진을 클릭하셔서 \n '${whiskyName}'에 대해 알아보세요 :)`;

  const speed = 100;
  let i = 0;

  // 개행 문자를 <br> 태그로 바꾸어줌
  const changeLineBreak = (text) => {
    return text.map((char) => (char === "\n" ? "\n" : char));
  };

  const typing = () => {
    const letter = changeLineBreak(letters.split(""));

    let j = 0;
    const intervalId = setInterval(() => {
      if (j >= letter.length - 1) {
        clearInterval(intervalId);
        // setTimeout(remove, 800);
        return;
      }
      setText((text) => text + letter[j]);
      j++;
    }, speed);
  };

  const imageVariants = {
    hidden: { x: "-100vw" },
    visible: { x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  useEffect(() => {
    setTimeout(typing, 1000);
  }, []);

  return (
    <>
      <SBackImg>
        <SContainer>
          <motion.div
            style={{ height: "100%" }}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <SWhiskyImg src={whisky} />
          </motion.div>
          <SRight>
            <STextCon>
              <SText ref={textRef}>
                {text.slice(0, 7)}
                <SUserName>{text.slice(7, 7 + userNameLen)}</SUserName>
                {text.slice(7 + userNameLen, 74 + userNameLen)}
                <span style={{ fontFamily: "GmarketSansBold" }}>
                  {text.slice(74 + userNameLen, 76 + userNameLen + whiskyNameLen)}
                </span>
                {text.slice(76 + userNameLen + whiskyNameLen)}
              </SText>
            </STextCon>
          </SRight>
        </SContainer>
      </SBackImg>
    </>
  );
};

export default MainRecommend;

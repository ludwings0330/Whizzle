import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import mainRecommendImg from "../../assets/img/main_recommend.jpg";
import mobileMainImg from "../../assets/img/mobile_main_recommend.png";
import { todayWhisky } from "../../hooks/todayWhisky";

const SBackImg = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background: url(${mainRecommendImg}) center center / cover no-repeat;
  display: flex;
  justify-content: start;
  align-items: center;

  @media screen and (max-width: 800px) {
    height: 85vh;
    background: url(${mobileMainImg}) center center / cover no-repeat;
    justify-content: center;
  }
`;

const SContainer = styled.div`
  display: flex;
  align-items: end;
  padding-top: 8vh;
  padding-left: 11vh;
  height: 77vh;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    padding-top: 0;
    padding-left: 0;
  }
`;

const SWhiskyImg = styled.img`
  cursor: pointer;
  margin-right: 8vh;
  height: 100%;
  transition: 0.5s;
  transform-origin: bottom;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s;
  }
  @media screen and (max-width: 800px) {
    height: 100%;
    margin-right: 0;
    margin-top: 70px;
    margin-bottom: 0;
  }
`;

const STextCon = styled.div`
  height: 35vh;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  margin-bottom: 6vh;
  @media screen and (max-width: 800px) {
    justify-content: center;
    align-items: center;
    height: 35vh;
    margin-bottom: 0;
    margin-top: 50px;
    margin-left: 100px;
  }
`;

const SRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  @media screen and (max-width: 800px) {
    justify-content: center;
    align-items: center;
  }
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
  font-size: 4vh;
  line-height: 1.5;
  letter-spacing: -2px;
  color: white;
  white-space: pre-line;
  &::after {
    content: "";
    margin-left: 0.6rem;
    border-right: 2px solid #777;
    animation: ${blink} 0.9s infinite steps(2);
  }
  @media screen and (max-width: 800px) {
    width: 100vw;
    font-size: 4.5vw;
    font-align: center;
  }
`;

const SUserName = styled.span`
  font-family: GmarketSansBold;
  background-image: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SMotion = styled(motion.div)`
  height: 100%;
  @media screen and (max-width: 800px) {
    height: 50%;
  }
`;

//메인화면에 띄워줄 추천부분(비로그인 사용자)
const MainRecommend = () => {
  const whisky = todayWhisky();

  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const userName = user.nickname;
  const userNameLen = userName.length;

  const whiskyName = whisky.name;
  const whiskyNameLen = whiskyName.length;

  const textRef = useRef(null);
  const [text, setText] = useState("");
  const letters = `안녕녕하세요. ${userName}님, \n 위즐에 오신 것을 환영합니다 ! \n \n 오늘의 위스키를 추천해드릴게요. \n 왼쪽의 사진을 클릭하셔서 \n '${whiskyName}'에 대해 알아보세요 :)`;

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

  const goDetail = () => {
    navigate(`/whisky/${whisky.id}`);
  };

  useEffect(() => {
    setTimeout(typing, 1000);
  }, []);

  return (
    <>
      <SBackImg>
        <SContainer>
          <SMotion variants={imageVariants} initial="hidden" animate="visible">
            <SWhiskyImg
              src={require(`../../assets/img/whisky_preset/${whisky.posterNumber}.png`)}
              onClick={goDetail}
            />
          </SMotion>
          <SRight>
            <STextCon>
              <SText ref={textRef}>
                {text.slice(0, 7)}
                <SUserName>{text.slice(7, 7 + userNameLen)}</SUserName>
                {text.slice(7 + userNameLen, 70 + userNameLen)}
                <span style={{ fontFamily: "GmarketSansBold" }}>
                  {text.slice(70 + userNameLen, 72 + userNameLen + whiskyNameLen)}
                </span>
                {text.slice(72 + userNameLen + whiskyNameLen)}
              </SText>
            </STextCon>
          </SRight>
        </SContainer>
      </SBackImg>
    </>
  );
};

export default MainRecommend;

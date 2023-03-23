import React from "react";
import styled from "styled-components";
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
  padding-right: 80px;
  height: 730px;
  transition: 0.5s;
  transform-origin: bottom;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s;
  }
`;

const SRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const SText = styled.div`
  font-family: GmarketSansLight;
  font-size: 40px;
  letter-spacing: -2px;
  color: white;
  padding-bottom: 50px;
`;

const SUserName = styled.span`
  font-family: GmarketSansBold;
  background-image: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

//메인화면에 띄워줄 추천부분(비로그인 사용자)
const MainRecommend = () => {
  return (
    <>
      <SBackImg>
        <SContainer>
          <SWhiskyImg src={whisky} />
          <SRight>
            <SText>
              안녕하세요. <SUserName>drunkenbear</SUserName>님,
              <br />
              다시 뵙게 되어 반갑습니다.
              <br />
              <br />
              <span style={{ fontFamily: "GmarketSansBold" }}>오늘의 위스키</span>를 추천해드릴게요.
              <br />
              옆의 위스키 사진을 클릭해
              <br />
              오늘의 위스키를 알아보세요 :)
            </SText>
          </SRight>
        </SContainer>
      </SBackImg>
    </>
  );
};

export default MainRecommend;

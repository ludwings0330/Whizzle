import React, { useState } from "react";
import DailyFlavorItem from "./DailyFlavorItem";
import styled from "styled-components";
import infoImg from "../../assets/img/info_pink.png";

const SCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SContent = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font-size: 24px;
  color: white;
`;

const STitle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #666666;
`;

const SImg = styled.img``;

const SInfo = styled.div`
  position: absolute;
  z-index: 1;
  text-align: left;
  top: 5px;
  left: 102%;
  min-width: 460px;
  padding: 18px 22px;
  gap: 10px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  color: #666666;
  display: ${(props) => (props.hover ? "block" : "none")};
`;

const SBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0px 20px;
  max-width: 800px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-bottom: 70px;
  padding: 30px 20px 20px 20px;
`;

const flavorPresetData = [
  "smoky",
  "peaty",
  "spicy",
  "herbal",
  "oily",
  "body",
  "rich",
  "sweet",
  "salty",
  "vanilla",
  "tart",
  "fruity",
  "floral",
];

const DailyFlavor = (props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <SCentered>
      <STitle>
        선호하는 flavor 태그를 선택해주세요. &nbsp;
        <SImg
          src={infoImg}
          alt="info.png"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        />
        <SInfo hover={isHover}>
          해당 맛을 선호하는만큼 클릭해주세요
          <br />
          최대 4번까지 클릭 가능하며 클릭 수만큼 테두리 색이 진해집니다
        </SInfo>
      </STitle>
      <SBox>
        {flavorPresetData.map((flavor, index) => (
          <DailyFlavorItem
            key={index}
            flavor={flavor}
            preference={props.preference}
            setPreference={props.setPreference}
          />
        ))}
      </SBox>
      {/* <SButton onClick={submitHandler}>
        <SButtonText>나만의 위스키 추천 결과 보러가기</SButtonText>
      </SButton> */}
    </SCentered>
  );
};

export default DailyFlavor;

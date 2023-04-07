import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { preference } from "../../../store/indexStore";
import { motion } from "framer-motion";
import QuestionChooseWhiskyItem from "./QuestionChooseWhiskyItem";
import styled from "styled-components";
import { warning } from "../../notify/notify";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
`;

const slide = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const SCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.isMobile ? "70px" : "0px")};
  margin-left: ${(props) => (props.isMobile ? "5vw" : "0px")};
  margin-right: ${(props) => (props.isMobile ? "5vw" : "0px")};
`;

const SContent = styled.p`
  margin-top: ${(props) => (props.isMobile ? "50px" : "200px")};
  margin-bottom: 10px;
  text-align: center;
  font-size: ${(props) => (props.isMobile ? "1.4rem" : "24px")};
  color: white;
`;

const STitle = styled.p`
  margin-top: 0;
  text-align: center;
  font-size: ${(props) => (props.isMobile ? "1.8rem" : "32px")};
  font-weight: bold;
  max-width: ${(props) => (props.isMobile ? "85vw" : "")};
  color: white;
  margin-bottom: 0px;
`;

const SBox = styled.div`
  display: flex;
  gap: ${(props) => (props.isMobile ? "10vh 4vw" : "117px 27px")};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isMobile ? "90vw" : "60vw")};
  margin-top: ${(props) => (props.isMobile ? "8vh" : "12vh")};
  margin-bottom: ${(props) => (props.isMobile ? "10vh" : "15vh")};
`;

const SButton = styled.button`
  cursor: pointer;
  display: block;
  width: ${(props) => (props.isMobile ? "90vw" : "464px")};
  height: 80px;
  border: none;
  border-radius: 999px;
  margin-bottom: 25vh;
  background: white;
`;

const SButtonText = styled.span`
  font-size: 18px;
  font-family: "Pretendard Variable";
  font-weight: bold;
  background-image: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const whiskyPresetData = [
  { id: 1, img: "Glenfiddich 12 Year", name: "글렌피딕 12년" },
  { id: 2, img: "Glenlivet 12 Year Double Oak", name: "글렌리벳 12년" },
  {
    id: 3,
    img: "Macallan Double Cask 12 Year",
    name: "맥캘란 12년 더블캐스크",
  },
  {
    id: 4,
    img: "Glenmorangie The Original 10 Year",
    name: "글렌모렌지 오리지널",
  },
  { id: 5, img: "Balvenie Doublewood 12 Year", name: "발베니 12년 더블우드" },
  { id: 6, img: "Laphroaig 10 Year", name: "라프로익 10년" },
  { id: 7, img: "Glen Grant 12 Year", name: "글렌 그란트 12년" },
  { id: 8, img: "Bowmore 12 Year", name: "보모어 12년" },
  { id: 9, img: "Jack Daniel's Old No. 7", name: "잭 다니엘 No.7" },
  { id: 10, img: "Jim Beam Original", name: "짐 빔" },
  { id: 11, img: "Jameson Irish Whiskey", name: "제임슨" },
  { id: 12, img: "Suntory Toki", name: "산토리 토키" },
  { id: 13, img: "Wild Turkey Bourbon 101", name: "와일드 터키 101" },
  { id: 14, img: "Buffalo Trace Bourbon", name: "버팔로 트레이스" },
  { id: 15, img: "Maker's Mark Bourbon", name: "메이커스 마크" },
  { id: 16, img: "Johnnie Walker Black Label", name: "조니워커 블랙 라벨" },
  { id: 17, img: "Ballantine's Finest", name: "발렌타인 파이니스트" },
  { id: 18, img: "Chivas Regal 12 Year", name: "시바스 리갈 12년" },
  { id: 19, img: "Talisker 10 Year", name: "탈리스커 10년" },
  { id: 20, img: "Yamazaki 12 Year", name: "야마자키 12년" },
  { id: 21, img: "Bulleit Rye", name: "불렛 라이" },
  { id: 22, img: "Knob Creek Small Batch Rye", name: "놉 크릭 라이" },
  {
    id: 23,
    img: "Johnnie Walker Green Label 15 Year",
    name: "조니워커 그린 라벨",
  },
  { id: 24, img: "Naked Grouse Blended Malt", name: "네이키드 몰트" },
];

//추천 경험자용 선호 위스키 질문
const QuestionChooseWhisky = (props) => {
  const preferenceValue = useRecoilValue(preference);
  const isMobile = props.isMobile;

  const submitHandler = () => {
    if (preferenceValue.whiskies.length > 0) {
      props.setDirection("next");
      props.setActivePage(6);
    } else {
      warning("1개 이상의 위스키를 선택해주세요!");
    }
  };

  useEffect(() => {
    props.setBarWidth(window.innerWidth * 0.99);
  });

  return (
    <motion.div
      style={slide}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, delay: 0.3 }}
    >
      <SCentered isMobile={isMobile}>
        <SContent isMobile={isMobile}>위스키를 즐겨 드시는군요!</SContent>
        {isMobile ? (
          <div>
            <STitle isMobile={isMobile}>가장 선호하는 위스키를</STitle>
            <STitle isMobile={isMobile}>3개까지 선택해주세요</STitle>
          </div>
        ) : (
          <STitle isMobile={isMobile}>가장 선호하는 위스키를 3개까지 선택해주세요</STitle>
        )}

        <SBox isMobile={isMobile}>
          {whiskyPresetData.map((whisky) => (
            <QuestionChooseWhiskyItem isMobile={isMobile} key={whisky.id} whisky={whisky} />
          ))}
        </SBox>
        <SButton isMobile={isMobile} onClick={props.whiskySubmitHandler}>
          <SButtonText>나만의 위스키 추천 결과 보러가기</SButtonText>
        </SButton>
      </SCentered>
    </motion.div>
  );
};

export default QuestionChooseWhisky;

import React from "react";
import styled from "styled-components";

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  background: #f84f5a;
`;

const SContent = styled.p`
  margin-top: 100px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 24px;
`;

const STitle = styled.p`
  margin-top: 0;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
`;

const SBox = styled.div`
  width: 226px;
  height: 291px;
  left: 722px;
  top: 427px;

  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
`;

const SImg = styled.img``;

const SName = styled.p`
  font-size: 16px;
  color: white;
`;

const SButton = styled.button`
  cursor: pointer;
  display: block;
  width: 464px;
  height: 89px;
  border: none;
  border-radius: 999px;
  font-size: 18px;
  font-family: "Pretendard Variable";
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
const QuestionChooseWhisky = () => {
  return (
    <SDiv>
      <SContent>위스키를 즐겨 드시는군요!</SContent>
      <STitle>가장 선호하는 위스키를 3개까지 선택해주세요</STitle>
      {whiskyPresetData.map((whisky) => (
        <SBox key={whisky.id}>
          <SImg
            src={`../../../assets/img/whisky_preset/${whisky.id}.png`}
            alt={whisky.img}
          />
          <SName>{whisky.name}</SName>
        </SBox>
      ))}
      <SButton>나만의 위스키 추천 결과 보러가기</SButton>
    </SDiv>
  );
};

export default QuestionChooseWhisky;

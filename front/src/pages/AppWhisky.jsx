import React, { useEffect } from "react";
import favorite from "../assets/img/favorite.png";
import create from "../assets/img/create.png";
import styled from "styled-components";
import { changeHeader, rollbackHeader } from "../hooks/changeHeader";

//import components
import WhiskyDetailInfo from "../components/whisky/WhiskyDetailInfo";
import WhiskyDetailReview from "../components/whisky/WhiskyDetailReview";
import WhiskySimilarList from "../components/whisky/WhiskySimilarList";
import Graph from "../components/common/Graph";

const SButton = styled.button`
  width: 63px;
  height: 63px;

  border-radius: 50%;
  border: none;

  background: #f84f5a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SButtonDiv = styled.div`
  position: sticky;
  left: 1500px;
  bottom: 50px;
  width: 63px;
  height: 120px;
`;

const SImg = styled.img`
  width: 33px;
  height: 33px;
`;

const SP = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const SContainer = styled.div`
  margin-top: 70px;
  max-width: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AppWhisky = () => {
  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  useEffect(() => {
    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, []);

  const exampleWhisky = {
    id: 1,
    name: "Glenfiddich 12 Year",
    image: {
      originalName: "Glenfiddich 12 Year.png",
      url: "assets/img/whisky_preset/1.png",
    },
    avg_rating: 3.36,
    review_count: 32,
    category: "Single Malt",
    location: "Speyside, Scotland",
    priceTier: 2,
    abv: 40,
    caskType: "American oak ex-bourbon, European oak ex-sherry",
    flavor: {
      smoky: 20,
      peaty: 10,
      spicy: 40,
      herbal: 30,
      oily: 30,
      body: 60,
      rich: 60,
      sweet: 60,
      salty: 20,
      vanilla: 70,
      tart: 50,
      fruity: 70,
      floral: 50,
    },
  };

  const whiskystatistics = {
    age: 20,
    gender: "남성",
  };

  return (
    <>
      <SContainer>
        <WhiskyDetailInfo whisky={exampleWhisky} stat={whiskystatistics} />
        <div style={{ width: "990px", marginBottom: "0px", marginTop: "30px" }}>
          <SP>이 위스키는 이런 맛을 가지고 있어요!</SP>
        </div>
        <Graph />
        <WhiskySimilarList />
        <WhiskyDetailReview whisky={exampleWhisky} stat={whiskystatistics} />
        <SButtonDiv>
          <SButton style={{ marginBottom: "10px" }}>
            <SImg src={favorite} alt="keep" />
          </SButton>
          <SButton>
            <SImg src={create} alt="create" />
          </SButton>
        </SButtonDiv>
      </SContainer>
    </>
  );
};

export default AppWhisky;

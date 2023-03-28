import React, { useEffect } from "react";
import styled from "styled-components";

//import images
import colorLogo from "../assets/img/colorLogo.png";
import logo from "../assets/img/logo.png";
import ImageUploader from "../components/review/create/ImageUploader";

//import components
import ReviewContent from "../components/review/create/ReviewContent";
import ReviewDetailInfo from "../components/review/create/ReviewDetailInfo";
import ReviewRating from "../components/review/create/ReviewRating";

const SContainer = styled.div`
  margin-top: 150px;
  max-width: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const STitleDiv = styled.div`
  width: 900px;
  display: flex;
  align-items: left;
`;

const STitleP = styled.p`
  font-weight: bold;
  font-size: 35px;
`;
const SP = styled.p`
  font-size: 18px;
  margin-top: 47px;
  margin-left: 80px;
`;

const SButton = styled.button`
  background-image: linear-gradient(
    to right,
    #f84f5a 0%,
    #f84f5a 0%,
    #f84f5a 21%,
    #f2a660 52%,
    #f2a660 78%,
    #f2a660 100%
  );
  width: 280px;
  height: 70px;
  border-radius: 999px;
  margin-top: 60px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: none;

  &: hover {
    background-image: linear-gradient(
      to right,
      #f2a660 0%,
      #f2a660 0%,
      #f2a660 21%,
      #f84f5a 52%,
      #f84f5a 78%,
      #f84f5a 100%
    );
  }
`;

const SContentP = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-top: 50px;
`;

const SContentDiv = styled.div`
  width: 900px;
  display: flex;
  align-items: left;
`;

//리뷰작성 페이지
const AppReview = () => {
  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  useEffect(() => {
    const navLogo = document.getElementById("logo");
    navLogo.src = colorLogo;
    const navTexts = document.querySelectorAll(".text, .dropdown");
    for (let i = 0; i < navTexts.length; i++) {
      navTexts[i].style.color = "#000000";
    }
    // 페이지 unmount시 원래대로 복구
    return () => {
      navLogo.src = logo;
      for (let i = 0; i < navTexts.length; i++) {
        navTexts[i].style.color = "#ffffff";
      }
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

  return (
    <>
      <SContainer>
        <STitleDiv>
          <STitleP>리뷰 작성</STitleP>
          <SP>아래 위스키에 대한 리뷰를 작성해주세요</SP>
        </STitleDiv>
        <ReviewDetailInfo whisky={exampleWhisky} />
        <SContentDiv>
          <SContentP>사진 등록(최대 5장)</SContentP>
        </SContentDiv>
        <ImageUploader />
        <SContentDiv>
          <SContentP>리뷰 내용</SContentP>
        </SContentDiv>
        <ReviewContent />
        <SContentDiv>
          <SContentP>평점 등록</SContentP>
        </SContentDiv>
        <ReviewRating whisky={exampleWhisky} />
        <SButton>작성완료</SButton>
      </SContainer>
    </>
  );
};

export default AppReview;

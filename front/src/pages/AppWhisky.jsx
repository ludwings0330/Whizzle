import React, { useEffect } from "react";
import colorLogo from "../assets/img/colorLogo.png";
import logo from "../assets/img/logo.png";

//import components
import WhiskyDetailInfo from "../components/whisky/WhiskyDetailInfo";
import WhiskyDetailReview from "../components/whisky/WhiskyDetailReview";
import WhiskySilmilarList from "../components/whisky/WhiskySilmilarList";
import WhiskyDetailGraph from "../components/whisky/WhiskyDetailGraph";

const AppWhisky = () => {
  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  useEffect(() => {
    const navLogo = document.getElementById("logo");
    navLogo.src = colorLogo;
    const navTexts = document.getElementsByClassName("text");
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

  const whiskystatistics = {
    age: 20,
    gender: "남성",
  };

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <WhiskyDetailInfo whisky={exampleWhisky} stat={whiskystatistics} />
        <WhiskyDetailGraph />
        <WhiskyDetailReview whisky={exampleWhisky} stat={whiskystatistics} />
        <WhiskySilmilarList />
      </div>
    </>
  );
};

export default AppWhisky;

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import favoriteBorder from "../../../assets/img/favorite_border.png";
import favoriteFilled from "../../../assets/img/favorite_filled.png";
import ReactStars from "react-stars";
import { userState } from "../../../store/userStore";
import { useRecoilState, useRecoilValue } from "recoil";
import { keepToggle } from "../../../apis/whiskyDetail";
import { warning } from "../../notify/notify";
import { recommendResult } from "../../../store/indexStore";
import moneyImg from "../../../assets/img/money.png";

const SDiv = styled.div`
  margin-top: 2vh;
  margin-bottom: 3vh;
  width: 100%;

  &.no-1 {
    width: 90vw;
  }

  &.no-2 {
    width: 80vw;
  }

  &.no-3 {
    width: 75vw;
  }

  @media (max-width: 360px) {
    &.no-1,
    &.no-2,
    &.no-3 {
      width: 80%;
    }
  }
`;

const SCardDiv = styled.div`
  height: 50vh;
  width: 50vh;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1.5fr 1fr;
  position: relative;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  cursor: pointer;
  width: 100%;
  left: 0;

  &.no-1 {
    width: 863px;
  }

  &.no-2 {
    width: 815px;
    left: 110px;
  }

  &.no-3 {
    width: 738px;
    left: 110px;
  }

  @media (max-width: 412px) {
    &.no-1,
    &.no-2,
    &.no-3 {
      width: 100%;
      left: 0;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  @media (min-width: 413px) and (max-width: 615px) {
    &.no-1,
    &.no-2,
    &.no-3 {
      width: 100%;
      left: 0;
      max-width: 400px;
      margin: 0 auto;
    }
  }

  @media (min-width: 616px) and (max-width: 767px) {
    &.no-1,
    &.no-2,
    &.no-3 {
      width: 100%;
      left: 0;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    &.no-1,
    &.no-2,
    &.no-3 {
      width: 100%;
      left: 0;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  @media (min-width: 1024px) {
    &.no-1,
    &.no-2,
    &.no-3 {
      width: 100%;
      left: 0;
      max-width: 800px;
      margin: 0 auto;
    }
  }
`;

const SImg = styled.img`
  height: 22vh;
  width: 12vh;
  margin-bottom: 2vh;
`;

const SImgDiv = styled.div`
  height: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 412px) {
    height: 56.6vw;
  }

  @media only screen and (max-width: 360px) {
    height: 61.3vw;
  }

  @media only screen and (max-width: 375px) {
    height: 67.2vw;
  }
`;

const SKeepBtn = styled.button`
  width: 2vw;
  height: 2vh;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 5px;
}`;

const STitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const STitleP = styled.p`
  font-weight: 700;
  font-size: 1rem;
`;

const STextDiv = styled.div`
  display: flex;
  height: 4vh;
  margin-top: 0;
  margin-bottom: 8px;
  align-items: center;
  line-height: 2vh;
  @media (max-width: 360px) {
    height: 3vh;
    margin-bottom: 2vh;
    line-height: 2vh;
  }
`;

const SP = styled.p`
  font-size: 0.7rem;
  font-weight: 300;

  &.title {
    font-weight: 600;
    width: 12vw;
  }
`;

const SRatingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
`;

const SBoldColorP = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: "Pacifico";
  display: inline-block;
  font-weight: 400;
  font-size: 3rem;

  &.no-1 {
    background: linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-size: 3.5rem;
  }

  &.no-2 {
    color: #F84F5A;
  }

  &.no-3 {
    color: #636363;
`;

const SKeepImg = styled.img`
  height: 3vh;
  width: 3vh;
  margin-left: 10vw;
`;

const SMoneyImg = styled.img`
  height: 2vh;
  width: 2vh;
`;

const SRatingP = styled.p`
  font-size: 0.6rem;
  margin-right: 1vw;
  font-weight: 300;
`;

const MobileResultMainWhiskyItem = (props) => {
  const whisky = props.whisky;
  const index = String(props.index);
  const [resultValue, setResultValue] = useRecoilState(recommendResult);

  const [isKeep, setIsKeep] = useState(whisky.isKept);
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);

  const onKeepHandler = async (e) => {
    e.stopPropagation();
    if (isLogin) {
      const result = await keepToggle(whisky.id);

      if (result === true) {
        setIsKeep((prev) => !prev);

        const targetId = whisky.id;

        const updatedResult = resultValue.map((whisky) => {
          if (whisky.id === targetId) {
            return { ...whisky, isKept: !isKeep };
          }

          return whisky;
        });

        setResultValue(updatedResult);
      }
    } else {
      warning("로그인이 필요한 기능입니다!");
      navigate("/signin");
    }
  };

  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/whisky/${whisky.id}`);
  };

  return (
    <SDiv onClick={onClickHandler} className={`no-${index}`}>
      <SBoldColorP className={`no-${index}`}>no.{props.index}</SBoldColorP>
      <SCardDiv className={`no-${index}`}>
        <SImgDiv>
          <SImg src={whisky.imageUrl} alt="X" />
        </SImgDiv>
        <div>
          <STitleDiv>
            <STitleP>{whisky.name}</STitleP>
            <SKeepBtn onClick={onKeepHandler}>
              <SKeepImg src={isKeep ? favoriteFilled : favoriteBorder} alt="x" />
            </SKeepBtn>
          </STitleDiv>
          <div>
            <STextDiv>
              <SP className="title">분류</SP>
              <SP>{whisky.category}</SP>
            </STextDiv>
            <STextDiv>
              <SP className="title">원산지</SP>
              <SP>{whisky.location}</SP>
            </STextDiv>
            <STextDiv>
              <SP className="title">도수</SP>
              <SP>{whisky.abv}%</SP>
            </STextDiv>
            <STextDiv>
              <SP className="title">가격</SP>
              {Array(whisky.priceTier)
                .fill()
                .map((cnt, index) => {
                  return <SMoneyImg key={index} src={moneyImg} />;
                })}
            </STextDiv>
          </div>
        </div>
        <SRatingDiv>
          <SP>{whisky.avgRating}</SP>
          <ReactStars
            count={5}
            value={Math.round(whisky.avgRating * 2) / 2}
            edit={false}
            size={10}
            color1={"rgba(128, 128, 128, 0.2)"}
            color2={"#F84F5A"}
          />
          <SRatingP>{whisky.reviewCount} rating(s)</SRatingP>
        </SRatingDiv>
      </SCardDiv>
    </SDiv>
  );
};

export default MobileResultMainWhiskyItem;

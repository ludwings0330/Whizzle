import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import favoriteBorder from "../../../assets/img/favorite_border.png";
import favoriteFilled from "../../../assets/img/favorite_filled.png";
import ReactStars from "react-stars";
import { userState } from "../../../store/userStore";
import { useRecoilState, useRecoilValue } from "recoil";
import { keepToggle } from "../../../apis/whiskyDetail";
import { recommendResult } from "../../../store/indexStore";
import Swal from "sweetalert2";
import moneyImg from "../../../assets/img/money.png";

const SDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;

  &.no-1 {
    width: 830px;
  }

  &.no-2 {
    width: 780px;
  }

  &.no-3 {
    width: 730px;
  }
`;

const SCardDiv = styled.div`
  height: 250px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 50px;
  position: relative;
  left: 100px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.5s;

  &.no-1 {
    width: 660px;
  }

  &.no-2 {
    width: 600px;
    left: 100px;
  }

  &.no-3 {
    width: 550px;
    left: 100px;
  }

  &:hover {
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }
`;

const SImg = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
  transform-origin: bottom;

  ${SDiv}:hover & {
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

const SImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
  text-align: center;
  position: absolute;
  left: 25px;
  bottom: 30px;
  width: 130px;
`;

const SKeepBtn = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 4px;
  margin-left: 5px;
  position: absolute;
  top: 26px;
  right: 35px;
  transition: 0.5s;

  &:hover {
    transform: scale(1.3);
    transition: 0.5s;
  }
`;

const STitleDiv = styled.div`
  display: flex;
  align-items: center;
`;

const STitleP = styled.p`
  font-weight: 700;
  font-size: 20px;
  margin-top: 10px;
`;

const STextDiv = styled.div`
  display: flex;
  height: 23px;
  margin-top: 0px;
  margin-bottom: 8px;
  align-items: center;
  lien-height: 29px;
`;

const SP = styled.p`
  font-size: 16px;
  margin-right: 10px;
  font-weight: 300;

  &.title {
    font-weight: 600;
    width: 70px;
  }
`;

const SRatingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const SBoldColorP = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 10px;
  font-family: "Pacifico";
  display: inline-block;
  font-weight: 400;
  font-size: 40px;

  &.no-1 {
    background: linear-gradient(90deg, #f84f5a, #f29060, #f7cb5a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-size: 55px;
  }

  &.no-2 {
    color: #F84F5A;
  }

  &.no-3 {
    color: #363636;
`;

const ResultMainWhiskyItem = (props) => {
  const whisky = props.whisky;
  const index = String(props.index);
  const [resultValue, setResultValue] = useRecoilState(recommendResult);

  const [isKeep, setIsKeep] = useState(whisky.isKept);
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);

  const onKeepHandler = async (e) => {
    e.stopPropagation();
    if (isLogin) {
      setIsKeep((prev) => !prev);
      const result = await keepToggle(whisky.id);

      if (result === true) {
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
      Swal.fire({
        title: "로그인이 필요한 기능입니다. \n로그인 하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: {
          container: "my-swal-container",
          confirmButton: "my-swal-confirm-button",
          cancelButton: "my-swal-cancel-button",
          icon: "my-swal-icon",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin");
        }
      });
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
        <SKeepBtn onClick={onKeepHandler}>
          <img src={isKeep ? favoriteFilled : favoriteBorder} alt="x" />
        </SKeepBtn>
        <div style={{ width: "48%" }}>
          <STitleDiv>
            <STitleP>{whisky.name}</STitleP>
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
              <SP className="title">가격</SP> {/*가격의 자세한 표현법에 대해 추가 논의 필요*/}
              {Array(whisky.priceTier)
                .fill()
                .map((cnt, index) => {
                  return <img key={index} src={moneyImg} style={{ height: "100%" }} />;
                })}
            </STextDiv>
          </div>
        </div>
        <SRatingDiv>
          <p
            style={{
              fontWeight: "300",
              fontSize: "28px",
              marginBottom: "0px",
              marginTop: "5px",
            }}
          >
            {whisky.avgRating === 0 ? "NR" : whisky.avgRating}
          </p>
          <ReactStars
            count={5}
            value={Math.round(whisky.avgRating * 2) / 2}
            edit={false}
            size={20}
            color1={"rgba(128, 128, 128, 0.2)"}
            color2={"#F84F5A"}
          />
          <p style={{ fontSize: "16px", marginTop: "5px" }}>{whisky.reviewCount} rating(s)</p>
        </SRatingDiv>
      </SCardDiv>
    </SDiv>
  );
};

export default ResultMainWhiskyItem;

import React from "react";
import styled from "styled-components";
import ReactStars from "react-stars";
import moneyImg from "../../../assets/img/money.png";

const SDiv = styled.div`
  display: flex;
  margin-top: 90px;
  justify-content: center;
  align-items: flex-end;
`;

const SInfoDiv = styled.div`
  position: relative;
  border-radius: 16px;
  width: 830px;
  height: 280px;
  display: flex;
  justify-content: end;
  align-items: center;
  box-shadow: 0px 0px 25px rgba(248, 79, 90, 0.5);
`;

const SContainer = styled.div`
  left: 48px;
  width: 150px;
  height: 280px;
  margin-bottom: 60px;
  text-align: center;
  position: absolute;
`;

const SImg = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;

const STextDiv = styled.div`
  display: flex;
  height: 18px;
  margin-top: 15px;
  align-items: center;
  line-height: 25px;
`;

const STitleP = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin-top: 0px;
  margin-bottom: 28px;
`;

const SP = styled.p`
  font-size: 18px;

  &.title {
    font-weight: bold;
    width: 70px;
  }
`;

const SRatingP = styled.p`
  margin-top: 5px;
  margin-bottom: 0px;
`;

const SRatingDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SRightDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 55px;
`;

const SDetailDiv = styled.div`
  width: 380px;
  margin-right: 20px;
`;

const ReviewDetailInfo = (props) => {
  const whisky = props.whisky;

  return (
    <>
      <SDiv>
        <SInfoDiv>
          <SContainer>
            <SImg src={whisky.imageUrl} alt={whisky.name} />
          </SContainer>
          <SDetailDiv>
            <STitleP>{whisky.name}</STitleP>
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
                  return <img key={index} alt="가격" src={moneyImg} style={{ height: "110%" }} />;
                })}
            </STextDiv>
          </SDetailDiv>

          <SRightDiv>
            <SP style={{ fontSize: "30px", marginBottom: "5px", marginTop: 0 }}>
              {whisky.avgRating === 0 ? "NR" : whisky.avgRating}
            </SP>

            <SRatingDiv>
              <ReactStars
                count={5}
                value={Math.round(whisky.avgRating * 2) / 2}
                edit={false}
                size={28}
                color1={"rgba(128, 128, 128, 0.2)"}
                color2={"#F84F5A"}
              />
              <SRatingP>{whisky.reviewCount} rating(s)</SRatingP>
            </SRatingDiv>
          </SRightDiv>
        </SInfoDiv>
      </SDiv>
    </>
  );
};

export default ReviewDetailInfo;

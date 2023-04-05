import React from "react";
import styled from "styled-components";
import ReactStars from "react-stars";
import moneyImg from "../../assets/img/money.png";

const SDiv = styled.div`
  display: flex;
  width: 100vw;
  max-width: 100%;
  height: 450px;
  justify-content: center;
  align-items: center;
  background: #f7f3f0;
`;

const SInnerDiv = styled.div`
  display: flex;
  width: 830px;
  justify-content: center;
  align-items: center;
`;

const SImgContainer = styled.div`
  max-width: 300px;
  margin-right: 50px;
`;

const SImg = styled.img`
  height: 365px;
  max-width: 100%;
  object-fit: cover;
  margin-right: 70px;
`;

const STextDiv = styled.div`
  display: flex;
  height: 20px;
  margin-top: 0px;
  margin-bottom: 16px;
  align-items: center;
  lien-height: 29px;
`;

const STitleP = styled.p`
  font-weight: bold;
  font-size: 28px;
  margin-top: 0px;
  margin-bottom: 35px;
  max-width: 800px;
`;

const SP = styled.p`
  font-size: 20px;
  margin-right: 10px;

  &.title {
    font-weight: bold;
    width: 70px;
  }
`;

const SRatingP = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
`;

const SRatingDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SStatDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 90px;

  background: #ffffff;
  box-shadow: 0px 4px 35px rgba(193, 193, 193, 0.25);
  border-radius: 30px;
  margin-top: 50px;
`;

const SStatP = styled.p`
  font-size: 18px;
`;

const SStatContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  max-width: 100%;
`;

//위스키 상세페이지에 띄워줄 위스키의 상세정보
const WhiskyDetailInfo = (props) => {
  const whisky = props.whisky;
  const stat = props.stat;

  return (
    <>
      <SDiv>
        <SInnerDiv>
          <SImgContainer>
            <SImg src={whisky.imageUrl} alt={whisky.name} />
          </SImgContainer>
          <div>
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
                  return <img key={index} src={moneyImg} style={{ height: "110%" }} />;
                })}
            </STextDiv>
            <STextDiv style={{ marginTop: "50px" }}>
              <SP style={{ fontWeight: "200", fontSize: "40px", marginRight: "20px" }}>
                {whisky.avgRating ? whisky.avgRating : "NR"}
              </SP>
              <SRatingDiv>
                <ReactStars
                  count={5}
                  value={Math.round(whisky.avgRating * 2) / 2}
                  edit={false}
                  size={21}
                  color1={"rgba(128, 128, 128, 0.2)"}
                  color2={"#F84F5A"}
                />
                <SRatingP>{whisky.reviewCount} rating(s)</SRatingP>
              </SRatingDiv>
            </STextDiv>
          </div>
        </SInnerDiv>
      </SDiv>
      {stat && (
        <SStatContainer>
          <SStatDiv>
            <SStatP>
              <span style={{ color: "#F84F5A" }}>
                {stat.age}대 {stat.gender}
              </span>
              이 선호하는 위스키입니다.
            </SStatP>
          </SStatDiv>
        </SStatContainer>
      )}
    </>
  );
};

export default WhiskyDetailInfo;

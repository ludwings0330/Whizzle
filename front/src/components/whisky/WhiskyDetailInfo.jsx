import React from "react";
import styled from "styled-components";
import ReactStars from "react-stars";

const SDiv = styled.div`
  display: flex;
  width: 100%;
  height: 550px;
  justify-content: center;
  align-items: center;

  background: #f7f3f0;
`;

const SImg = styled.img`
  height: 365px;
`;

const STextDiv = styled.div`
  display: flex;
  height: 29px;
  margin-top: 0px;
  margin-bottom: 16px;
  align-items: center;
  lien-height: 29px;
`;

const STitleP = styled.p`
  font-weight: 700;
  font-size: 36px;
  margin-top: 0px;
  margin-bottom: 35px;
`;

const SP = styled.p`
  font-size: 24px;
  margin-right: 10px;

  &.title {
    font-weight: bold;
    width: 70px;
  }
`;

//위스키 상세페이지에 띄워줄 위스키의 상세정보
const WhiskyDetailInfo = (props) => {
  const whisky = props.whisky;

  return (
    <>
      <SDiv>
        <SImg src={require(`../../${whisky.image.url}`)} alt={whisky.name} />
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
            <SP>{whisky.priceTier}</SP>
          </STextDiv>
          <STextDiv style={{ marginTop: "30px" }}>
            <SP style={{ fontSize: "40px", marginRight: "20px" }}>{whisky.avg_rating}</SP>
            <ReactStars
              count={5}
              value={Math.round(whisky.avg_rating * 2) / 2}
              edit={false}
              size={21}
              color1={"rgba(128, 128, 128, 0.2)"}
              color2={"#F84F5A"}
            />
          </STextDiv>
        </div>
      </SDiv>
    </>
  );
};

export default WhiskyDetailInfo;

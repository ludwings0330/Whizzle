import React from "react";
import styled from "styled-components";
import ReactStars from "react-stars";

const SDiv = styled.div`
  display: flex;
  width: 100vw;
  max-width: 100%;
  height: 350px;
  justify-content: center;
  align-items: flex-end;
`;

const SInfoDiv = styled.div`
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  width: 900px;
  height: 310px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 15px #ed5f68;
`;

const SImg = styled.img`
  height: 310px;
  margin-bottom: 50px;
`;

const STextDiv = styled.div`
  display: flex;
  height: 18px;
  margin-top: 0px;
  margin-bottom: 25px;
  align-items: center;
  line-height: 25px;
`;

const STitleP = styled.p`
  font-weight: 700;
  font-size: 35px;
  margin-top: 0px;
  margin-bottom: 35px;
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

const SRightDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SDetailDiv = styled.div`
  margin-right: 50px;
`;

const ReviewDetailInfo = (props) => {
  const whisky = props.whisky;

  return (
    <>
      <SDiv>
        <SInfoDiv>
          <SImg src={require(`../../../${whisky.image.url}`)} alt={whisky.name} />

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
              <SP className="title">가격</SP> {/*가격의 자세한 표현법에 대해 추가 논의 필요*/}
              <SP>{whisky.priceTier}</SP>
            </STextDiv>
          </SDetailDiv>

          <SRightDiv>
            <SP style={{ fontSize: "30px", marginBottom: "10px" }}>{whisky.avg_rating}</SP>

            <SRatingDiv>
              <ReactStars
                count={5}
                value={Math.round(whisky.avg_rating * 2) / 2}
                edit={false}
                size={28}
                color1={"rgba(128, 128, 128, 0.2)"}
                color2={"#F84F5A"}
              />
              <SRatingP>{whisky.review_count} rating(s)</SRatingP>
            </SRatingDiv>
          </SRightDiv>
        </SInfoDiv>
      </SDiv>
    </>
  );
};

export default ReviewDetailInfo;

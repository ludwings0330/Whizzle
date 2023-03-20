import React from "react";
import styled from "styled-components";
import favoriteBorder from "../../../assets/img/favorite_border.png";
import ReactStars from "react-stars";

const SDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;

  &.no-1 {
    width: 990px;
  }
  &.no-2 {
    width: 916px;
  }
  &.no-3 {
    width: 841px;
  }
`;

const SCardDiv = styled.div`
  height: 284px;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  position: relative;
  left: 127px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;

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
`;

const SImg = styled.img`
  max-height: 85%;
  max-width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const SImgDiv = styled.div`
  height: 284px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SKeepBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 4px;
  margin-left: 5px;
`;

const STitleDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const STitleP = styled.p`
  font-weight: 700;
  font-size: 24px;
`;

const STextDiv = styled.div`
  display: flex;
  height: 29px;
  margin-top: 0px;
  margin-bottom: 8px;
  align-items: center;
  lien-height: 29px;
`;

const SP = styled.p`
  font-size: 20px;
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
`;

const SBoldColorP = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 10px;
  font-family: "Pacifico";
  display: inline-block;
  font-weight: 400;
  font-size: 48px;
  
  &.no-1 {
    background: linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-size: 64px;
  }

  &.no-2 {
    color: #F84F5A;
  }

  &.no-3 {
    color: #636363;
`;

const ResultMainWhiskyItem = (props) => {
  const whisky = props.whisky;
  const index = String(props.index);
  const onKeepHandler = () => {
    console.log(`${whisky.name} 킵 버튼`);
  };

  return (
    <SDiv className={`no-${index}`}>
      <SBoldColorP className={`no-${index}`}>no.{props.index}</SBoldColorP>
      <SCardDiv className={`no-${index}`}>
        <SImgDiv>
          <SImg src={require(`../../../assets/img/whisky_preset/${index}.png`)} alt="X" />
        </SImgDiv>
        <div>
          <STitleDiv>
            <STitleP>{whisky.name}</STitleP>
            <SKeepBtn onClick={onKeepHandler}>
              <img src={favoriteBorder} alt="x" />
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
              <SP className="title">가격</SP> {/*가격의 자세한 표현법에 대해 추가 논의 필요*/}
              <SP>{whisky.priceTier}</SP>
            </STextDiv>
          </div>
        </div>
        <SRatingDiv>
          <p
            style={{
              fontWeight: "300",
              fontSize: "36px",
              marginBottom: "10px",
              marginTop: "5px",
            }}
          >
            {whisky.avg_rating}
          </p>
          <ReactStars
            count={5}
            value={Math.round(whisky.avg_rating * 2) / 2}
            edit={false}
            size={30}
            color1={"rgba(128, 128, 128, 0.2)"}
            color2={"#F84F5A"}
          />
          <p>{whisky.total_rating} rating(s)</p>
        </SRatingDiv>
      </SCardDiv>
    </SDiv>
  );
};

export default ResultMainWhiskyItem;

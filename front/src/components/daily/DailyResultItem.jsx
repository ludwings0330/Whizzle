import React from "react";
import styled from "styled-components";
import favoriteBorder from "../../assets/img/favorite_border.png";
import ReactStars from "react-stars";

const SCard = styled.div`
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 261px;
  height: 312px;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  padding: 27px;
`;

const STop = styled.div`
  display: flex;
  width: 190px;
  justify-content: space-between;
  align-items: center;
`;

const SImg = styled.img`
  height: 230px;
  transition: 0.5s;
  transform-origin: bottom;
  ${SCard}:hover & {
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

const SRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  gap: 30px;
`;

const SRating = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SAvg = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const SName = styled.div`
  min-height: 80px;
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 25px;
`;

const DailyResultItem = (props) => {
  return (
    <SCard>
      <STop>
        <SImg src={require(`../../assets/img/whisky_preset/2.png`)} />
        <SRight>
          <img src={favoriteBorder} alt="like.png" style={{ height: "30px" }} />
          <SRating>
            <SAvg>{props.whisky.avg_rating}</SAvg>
            <ReactStars
              count={5}
              value={Math.round(props.whisky.avg_rating * 2) / 2}
              edit={false}
              size={20}
              color1={"rgba(128, 128, 128, 0.2)"}
              color2={"#F84F5A"}
            />
            <p style={{ margin: 0 }}>{props.whisky.total_rating} rating(s)</p>
          </SRating>
        </SRight>
      </STop>
      <SName>{props.whisky.name}</SName>
    </SCard>
  );
};

export default DailyResultItem;

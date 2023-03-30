import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import favoriteBorder from "../../assets/img/favorite_border.png";
import favoriteFilled from "../../assets/img/favorite_filled.png";
import ReactStars from "react-stars";
import { keepApi } from "../../apis/whisky";

const SCard = styled.div`
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 261px;
  height: 312px;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  padding-top: 28px;
  padding-bottom: 10px;
  transition: 0.5s;
  &:hover {
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }
`;

const STop = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 18px;
  gap: 25px;
  width: 220px;
`;

const SContainer = styled.div`
  left: 23px;
  width: 90px;
  height: 225px;
  text-align: center;
  position: absolute;
`;

const SImg = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
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
  padding-right: 0px;
  min-width: 105px;
`;

const SLikeImg = styled.img`
  height: 32px;
  transition: 0.5s;
  z-index: 2;
  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
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
  padding-left: 25px;
  padding-right: 25px;
`;

const WhiskyListItem = (props) => {
  const navigate = useNavigate();
  const [isKeep, setIsKeep] = useState(props.whisky.isKept);

  const goDetail = () => {
    navigate(`/whisky/${props.whisky.id}`);
  };

  const keepHandler = async (event) => {
    event.stopPropagation();
    const result = await keepApi(props.whisky.id);
    if (result === true) {
      setIsKeep((prev) => !prev);
    }
  };

  return (
    <SCard onClick={goDetail}>
      <STop>
        <SContainer>
          <SImg src={props.whisky.imageUrl} />
        </SContainer>
        <SRight>
          {isKeep ? (
            <SLikeImg onClick={keepHandler} src={favoriteFilled} alt="like.png" />
          ) : (
            <SLikeImg onClick={keepHandler} src={favoriteBorder} alt="like.png" />
          )}
          <SRating>
            <SAvg>{props.whisky.reviewCount === 0 ? "NR" : props.whisky.avgRating}</SAvg>
            <ReactStars
              count={5}
              value={Math.round(props.whisky.avgRating * 2) / 2}
              edit={false}
              size={20}
              color1={"rgba(128, 128, 128, 0.2)"}
              color2={"#F84F5A"}
            />
            <p style={{ margin: 0 }}>{props.whisky.reviewCount} rating(s)</p>
          </SRating>
        </SRight>
      </STop>
      <SName>{props.whisky.name}</SName>
    </SCard>
  );
};

export default WhiskyListItem;

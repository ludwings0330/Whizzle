import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import favoriteBorder from "../../assets/img/favorite_border.png";
import favoriteFilled from "../../assets/img/favorite_filled.png";
import ReactStars from "react-stars";
import { keepApi } from "../../apis/whisky";
import { userState } from "../../store/userStore";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { recommendResult } from "../../store/indexStore";

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
  font-weight: 300;
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
  const [resultValue, setResultValue] = useRecoilState(recommendResult);

  const goDetail = () => {
    navigate(`/whisky/${props.whisky.id}`);
  };

  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);

  const keepHandler = async (event) => {
    event.stopPropagation();
    if (isLogin) {
      const currentKeep = isKeep;
      setIsKeep((prev) => !prev);

      const result = await keepApi(props.whisky.id);
      if (result === true) {
        const targetId = props.whisky.id;

        const updatedResult = resultValue.map((whisky) => {
          if (whisky.id === targetId) {
            return { ...whisky, isKept: !currentKeep };
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

  return (
    <SCard onClick={goDetail}>
      <STop>
        <SContainer>
          <SImg src={props.whisky.imageUrl} />
        </SContainer>
        <SRight>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            {isKeep ? (
              <SLikeImg onClick={keepHandler} src={favoriteFilled} alt="like.png" />
            ) : (
              <SLikeImg onClick={keepHandler} src={favoriteBorder} alt="like.png" />
            )}
          </motion.div>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userState } from "../../store/userStore";
import { useRecoilValue } from "recoil";
import { keepToggle } from "../../apis/whiskyDetail";
import favoriteBorder from "../../assets/img/favorite_border.png";
import favoriteFilled from "../../assets/img/favorite_filled.png";
import ReactStars from "react-stars";
import Swal from "sweetalert2";

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
  margin-top: 40px;
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
  height: 30px;
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

const WhiskySimilarListItem = (props) => {
  const whisky = props.whisky;
  const navigate = useNavigate();
  const [isKeep, setIsKeep] = useState(whisky.isKept);

  const goDetail = () => {
    if (props.notScroll) {
      navigate(`/whisky/${whisky.id}`);
    }
  };

  // keep 관련
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);

  const keepHandler = (e) => {
    e.stopPropagation();
    if (isLogin) {
      setIsKeep(!isKeep);
      keepToggle(whisky.id);
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
          <SImg src={whisky.imageUrl} alt="#" />
        </SContainer>
        <SRight>
          <SLikeImg
            onClick={keepHandler}
            src={isKeep ? favoriteFilled : favoriteBorder}
            alt="like.png"
          />
          <SRating>
            <SAvg>{whisky.avgRating ? whisky.avgRating : "NR"}</SAvg>
            <ReactStars
              count={5}
              value={Math.round(whisky.avgRating * 2) / 2}
              edit={false}
              size={20}
              color1={"rgba(128, 128, 128, 0.2)"}
              color2={"#F84F5A"}
            />
            <p style={{ margin: 0 }}>{whisky.reviewCount} rating(s)</p>
          </SRating>
        </SRight>
      </STop>
      <SName>{whisky.name}</SName>
    </SCard>
  );
};

export default WhiskySimilarListItem;

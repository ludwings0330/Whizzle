import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import ReactStars from "react-stars";
import favoriteBorder from "../../assets/img/review_favorite_border.png";
import favoriteFilled from "../../assets/img/review_favorite_filled.png";
import { likeReview } from "../../apis/review";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { userState } from "../../store/userStore";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 780px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-top: 20px;
`;

const SReviewInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 85px;
  margin-top: 30px;
`;

const SUserDiv = styled.div`
  min-width: 215px;
  height: 100%;
  margin-left: 29px;
`;

const SNicknameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 215px;
  height: 27px;
  line-height: 27px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const SProfileImg = styled.img`
  width: 75px;
  height: 75px;
  margin-left: 45px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

const SLevelDiv = styled.div`
  margin-left: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f84f5a;
  width: 55px;
  height: 27px;
`;

const SLikeDiv = styled.div`
  display: flex;
  height: 85px;
  align-items: center;
  margin-right: 63px;
`;

const SLikeImg = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 16px;
`;

const SReviewPicDiv = styled.div`
  width: 100%;
  height: 100px;
  margin-left: 45px;
  margin-top: 30px;
`;

const SImg = styled.img`
  height: 90px;
  width: 90px;
  object-fit: cover;
  margin-right: 16px;
  cursor: pointer;
`;

const STextDiv = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 20px;
  margin-bottom: 35px;
  width: 680px;
  font-size: 16px;
`;

const WhiskyDetailReviewItem = ({ review }) => {
  const [likeCount, setLikeCount] = useState(review.reviewInfo.likeCount);

  // 리뷰 좋아요
  async function likeToggle(id) {
    try {
      const res = await likeReview(id);
      if (res) {
      }
    } catch {}
  }

  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);
  const [isLike, setISLike] = useState(review.reviewInfo.liked);
  const onLikeHandler = () => {
    if (isLogin) {
      if (isLike) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setISLike(!isLike);
      likeToggle(review.reviewInfo.reviewId);
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

  const [seeMore, setSeeMore] = useState(false);
  const fullContent = () => {
    setSeeMore(!seeMore);
  };

  const modalHandler = (pic) => {
    Swal.fire({
      title: "  ",
      text: "",
      imageUrl: pic.reviewImageUrl,
      imageHeight: 480,
      imageAlt: "Custom image",
      showConfirmButton: false,
      customClass: {
        container: "my-swal-container",
        confirmButton: "my-swal-confirm-button",
        cancelButton: "my-swal-cancel-button",
        icon: "my-swal-icon",
      },
    });
  };

  const navigate = useNavigate();
  const goToUserPage = () => {
    navigate("/mypage", { state: { memberInfo: review.memberInfo } });
  };

  return (
    <Wrapper>
      <SReviewInfoDiv>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SProfileImg
            onClick={goToUserPage}
            src={review.memberInfo.profileImageUrl}
            alt="유저 프로필"
          />
          <SUserDiv>
            <SNicknameDiv>
              <p
                onClick={goToUserPage}
                style={{
                  marginLeft: "2px",
                  fontWeight: "600",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                {review.memberInfo.nickname}
              </p>
              <SLevelDiv>
                <p style={{ color: "#ffffff" }}>{Math.floor(review.memberInfo.level * 10) / 10}%</p>
              </SLevelDiv>
            </SNicknameDiv>
            <div style={{ display: "flex" }}>
              <ReactStars
                count={5}
                value={Math.round(review.reviewInfo.rating * 2) / 2}
                edit={false}
                size={21}
                color1={"rgba(128, 128, 128, 0.2)"}
                color2={"#F84F5A"}
              />
              <p style={{ marginTop: "3px", marginLeft: "8px" }}>
                {review.reviewInfo.createdDateTime.split("T")[0].replaceAll("-", ".")}
              </p>
            </div>
          </SUserDiv>
        </div>
        <SLikeDiv>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <SLikeImg
              style={{ cursor: "pointer" }}
              onClick={onLikeHandler}
              src={isLike ? favoriteFilled : favoriteBorder}
              alt="#"
            />
          </motion.div>
          <p style={{ color: "#F84F5A" }}>{likeCount}</p>
        </SLikeDiv>
      </SReviewInfoDiv>
      {review.reviewInfo.reviewImages.length ? (
        <SReviewPicDiv>
          {review.reviewInfo.reviewImages.slice(0, 5).map((pic, index) => (
            <SImg
              onClick={() => modalHandler(pic)}
              key={index}
              src={pic.reviewImageUrl}
              alt="리뷰사진"
            />
          ))}
        </SReviewPicDiv>
      ) : null}

      <STextDiv>
        {review.reviewInfo.content?.length > 255 ? (
          !seeMore ? (
            <p>
              {review.reviewInfo.content?.slice(0, 255)}
              <span style={{ cursor: "pointer" }} onClick={fullContent}>
                ...
              </span>
            </p>
          ) : (
            <p>
              {review.reviewInfo.content}
              {"  "}
              <span style={{ cursor: "pointer", fontWeight: "600" }} onClick={fullContent}>
                접기
              </span>
            </p>
          )
        ) : (
          <p>{review.reviewInfo.content}</p>
        )}
      </STextDiv>
    </Wrapper>
  );
};

export default WhiskyDetailReviewItem;

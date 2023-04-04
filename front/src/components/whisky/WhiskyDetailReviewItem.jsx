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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 990px;
  min-height: 450px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-top: 50px;
`;

const SReviewInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 85px;
  margin-top: 38px;
`;

const SUserDiv = styled.div`
  min-width: 215px;
  height: 100%;
  margin-left: 29px;
`;

const SNicknameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 215px;
  height: 27px;
  line-height: 27px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const SProfileImg = styled.img`
  width: 85px;
  height: 85px;
  margin-left: 45px;
  border-radius: 50%;
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
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin-right: 16px;
  cursor: pointer;
`;

const STextDiv = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 40px;
  margin-bottom: 48px;
  width: 890px;
  font-size: 20px;
`;

const WhiskyDetailReviewItem = ({ review }) => {
  const [likeCount, setLikeCount] = useState(review.reviewInfo.likeCount);

  // 리뷰 좋아요
  async function likeToggle(id) {
    try {
      const res = await likeReview(id);
      if (res) {
        console.log("리뷰 좋아요(or 취소) 성공");
      }
    } catch {
      console.log("리뷰 좋아요(or 취소) 실패");
    }
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
    });
  };

  const navigate = useNavigate();
  const goToUserPage = () => {
    navigate("/mypage", { state: { memberInfo: review.memberInfo } });
    console.log(review.memberInfo);
  };

  return (
    <Wrapper>
      <SReviewInfoDiv>
        <div style={{ display: "flex" }}>
          <SProfileImg src={review.memberInfo.profileImageUrl} alt="유저 프로필" />
          <SUserDiv>
            <SNicknameDiv>
              <p
                onClick={goToUserPage}
                style={{
                  marginLeft: "2px",
                  fontWeight: "600",
                  fontSize: "24px",
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
          <SLikeImg
            style={{ cursor: "pointer" }}
            onClick={onLikeHandler}
            src={isLike ? favoriteFilled : favoriteBorder}
            alt="#"
          />
          <p style={{ color: "#F84F5A" }}>{likeCount}</p>
        </SLikeDiv>
      </SReviewInfoDiv>
      {review.reviewInfo.reviewImages.length ? (
        <SReviewPicDiv>
          {review.reviewInfo.reviewImages.map((pic, index) => (
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
        {review.reviewInfo.content.length > 255 ? (
          !seeMore ? (
            <p>
              {review.reviewInfo.content.slice(0, 255)}
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

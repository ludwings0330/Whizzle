import React, { useState } from "react";
import styled from "styled-components";
import ReactStars from "react-stars";
import favoriteBorder from "../../assets/img/review_favorite_border.png";
import favoriteFilled from "../../assets/img/review_favorite_filled.png";

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
  width: 100px;
  height: 100px;
  margin-right: 16px;
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
  // 리뷰 좋아요
  const [isLike, setISLike] = useState(review.reviewInfo.liked);
  const likeReview = () => {
    console.log(review);
    setISLike(!isLike);
  };

  const [seeMore, setSeeMore] = useState(false);
  const fullContent = () => {
    setSeeMore(!seeMore);
  };

  return (
    <Wrapper>
      <SReviewInfoDiv>
        <div style={{ display: "flex" }}>
          <SProfileImg src={review.memberInfo.profileImageUrl} alt="유저 프로필" />
          <SUserDiv>
            <SNicknameDiv>
              <p style={{ marginLeft: "2px", fontWeight: "600", fontSize: "24px" }}>
                {review.memberInfo.nickname}
              </p>
              <SLevelDiv>
                <p style={{ color: "#ffffff" }}>{Math.floor(review.memberInfo.level * 10) / 10}%</p>
              </SLevelDiv>
            </SNicknameDiv>
            <ReactStars
              count={5}
              value={Math.round(review.reviewInfo.rating * 2) / 2}
              edit={false}
              size={21}
              color1={"rgba(128, 128, 128, 0.2)"}
              color2={"#F84F5A"}
            />
          </SUserDiv>
        </div>
        <SLikeDiv>
          <SLikeImg
            style={{ cursor: "pointer" }}
            onClick={likeReview}
            src={isLike ? favoriteFilled : favoriteBorder}
            alt="#"
          />
          <p style={{ color: "#F84F5A" }}>{review.reviewInfo.likeCount}</p>
        </SLikeDiv>
      </SReviewInfoDiv>
      {review.reviewInfo.reviewImages.length ? (
        <SReviewPicDiv>
          {review.reviewInfo.reviewImages.map((pic, index) => (
            <SImg key={index} src={pic.reviewImageUrl} alt="리뷰사진" />
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

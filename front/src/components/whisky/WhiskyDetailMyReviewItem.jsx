import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import ReactStars from "react-stars";
import favoriteFilled from "../../assets/img/review_favorite_filled.png";
import { useSetRecoilState } from "recoil";
import { deleteReview } from "../../apis/review";
import { reviewState } from "../../store/indexStore";
import Swal from "sweetalert2";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 990px;
  min-height: 450px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-top: 50px;
  box-shadow: 0px 0px 25px rgba(248, 79, 90, 0.5);
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
  margin-left: 21px;
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

const SButton = styled.button`
  font-family: "Pretendard Variable";
  width: 75px;
  height: 34px;
  border: 1px solid #797979;
  border-radius: 999px;
  margin-left: 6px;
  cursor: pointer;
  background-color: transparent;
  color: #898989;

  :hover {
    // 호버 효과 추가해주세요 이예진님
  }
`;

const WhiskyDetailMyReviewItem = ({ review, whiskyId, onDelete }) => {
  const setReview = useSetRecoilState(reviewState);
  const navigate = useNavigate();

  const changeReview = async () => {
    await new Promise((resolve) => {
      setReview(review);
      resolve();
    });
    navigate(`/review/${whiskyId}`);
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

  const reviewDeleteFunc = async () => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      try {
        const res = await deleteReview(review.reviewInfo.reviewId);
        if (res) {
          Swal.fire({
            title: "리뷰가 삭제되었습니다",
            icon: "success",
            showCloseButton: true,
            timer: 2000,
          });
          console.log("리뷰 삭제 성공");
          onDelete();
        }
      } catch {
        console.log("리뷰 삭제 실패");
      }
    }
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
          <SButton onClick={changeReview}>수정</SButton>
          <SButton onClick={reviewDeleteFunc}>삭제</SButton>
          <SLikeImg src={favoriteFilled} alt="#" />
          <p style={{ color: "#F84F5A" }}>{review.reviewInfo.likeCount}</p>
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

export default WhiskyDetailMyReviewItem;

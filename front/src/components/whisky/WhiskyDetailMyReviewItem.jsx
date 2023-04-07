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
  width: 800px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 25px rgba(248, 79, 90, 0.5);
`;

const SReviewInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-left: 21px;
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

const SButton = styled.button`
  font-family: "Pretendard Variable";
  width: 65px;
  height: 30px;
  border: 1px solid #dedede;
  border-radius: 999px;
  margin-left: 6px;
  cursor: pointer;
  background-color: transparent;
  color: #adadad;
  transition: all 0.3s;

  :hover {
    transition: all 0.3s;
    background-color: #dedede;
    color: #fff;
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
      customClass: {
        container: "my-swal-container",
        confirmButton: "my-swal-confirm-button",
        cancelButton: "my-swal-cancel-button",
        icon: "my-swal-icon",
      },
    });
  };

  const deletingReview = async () => {
    try {
      const res = await deleteReview(review.reviewInfo.reviewId);
      if (res) {
        Swal.fire({
          title: "리뷰가 삭제되었습니다",
          icon: "success",
          showCloseButton: true,
          timer: 2000,
          customClass: {
            container: "my-swal-container",
            confirmButton: "my-swal-confirm-button",
            cancelButton: "my-swal-cancel-button",
            icon: "my-swal-icon",
          },
        });
        onDelete();
      }
    } catch {}
  };

  const reviewDeleteFunc = () => {
    Swal.fire({
      title: "리뷰를 삭제하시겠습니까?",
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
        deletingReview();
      }
    });
  };

  return (
    <Wrapper>
      <SReviewInfoDiv>
        <div style={{ display: "flex", alignItems: "center" }}>
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

export default WhiskyDetailMyReviewItem;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { changeHeader, rollbackHeader } from "../hooks/changeHeader";
import { whiskyDetail } from "../apis/whiskyDetail";
import { reviewCreate, reviewUpdate } from "../apis/review";
import { useRecoilState } from "recoil";
import { reviewState } from "../store/indexStore";
import "./AppReview.css";

//import images
import ImageUploader from "../components/review/create/ImageUploader";

//import components
import ReviewContent from "../components/review/create/ReviewContent";
import ReviewDetailInfo from "../components/review/create/ReviewDetailInfo";
import ReviewRating from "../components/review/create/ReviewRating";
import { useNavigate, useParams } from "react-router";

const SContainer = styled.div`
  margin-top: 160px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const STitleDiv = styled.div`
  width: 830px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const STitleP = styled.p`
  font-weight: bold;
  font-size: 32px;
  color: #181818;
`;

const SP = styled.p`
  font-size: 16px;
  margin-left: 70px;
  color: #181818;
`;

const SContentP = styled.p`
  font-size: 20px;
  color: #181818;
  font-weight: bold;
  margin-top: 90px;
`;

const SContentDiv = styled.div`
  width: 830px;
  display: flex;
  align-items: left;
`;

const SButtonText = styled.span`
  font-size: 18px;
  font-family: "Pretendard Variable";
  color: white;
  z-index: 2;
`;

//리뷰작성 페이지
const AppReview = () => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useRecoilState(reviewState);
  const [isCreate, setIsCreate] = useState();

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const [whisky, setWhisky] = useState({});
  const whiskyId = useParams().id;

  const [preImages, setPreImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handlePreImages = (id) => {
    setDeleteImages((prev) => [...prev, id]);
    setPreImages(preImages.filter((image) => image.reviewImageId !== id));
  };

  const handleFiles = (datas) => {
    setFiles(datas);
  };

  const reviewSave = async (e) => {
    e.preventDefault();

    if (isCreate) {
      const formData = new FormData();
      formData.append("rating", rating === undefined ? 0 : rating);
      if (content !== undefined) {
        formData.append("content", content);
      }
      formData.append("whiskyId", whiskyId);

      if (files !== []) {
        files.forEach((file) => {
          formData.append("reviewImageFiles", file);
        });
      }

      try {
        await reviewCreate(formData);
        navigate(`/whisky/${whiskyId}?review=true`);
      } catch {}
    } else {
      const formData = new FormData();
      formData.append("rating", rating);
      if (content !== undefined) {
        formData.append("content", content);
      }
      if (files !== []) {
        files.forEach((file) => {
          formData.append("addedReviewImageFiles", file);
        });
      }
      formData.append("deletedReviewImageIds", deleteImages);
      try {
        const reviewId = reviewData.reviewInfo.reviewId;
        await reviewUpdate(reviewId, formData);
        navigate(`/whisky/${whiskyId}?review=true`);
      } catch {}
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!reviewData.reviewInfo) {
      setIsCreate(true);
    } else {
      setIsCreate(false);
    }
  }, []);

  const getWhiskyInfo = async (id) => {
    try {
      const whiskyData = await whiskyDetail(whiskyId);
      setWhisky(whiskyData);
    } catch {}
  };

  const getReviewInfo = () => {
    const data = reviewData.reviewInfo;
    setPreImages(data?.reviewImages);
    setContent(data?.content);
    setRating(data?.rating);
  };

  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  useEffect(() => {
    getWhiskyInfo();
    if (!isCreate) {
      getReviewInfo();
    }

    changeHeader();
    return () => {
      rollbackHeader();
      setReviewData({});
    };
  }, []);

  return (
    <>
      <form encType="multipart/form-data">
        <SContainer>
          <STitleDiv>
            <STitleP>{isCreate ? "리뷰 작성" : "리뷰 수정"}</STitleP>
            <SP>
              {isCreate
                ? "아래 위스키에 대한 리뷰를 작성해주세요"
                : "아래 위스키에 대한 리뷰를 수정해주세요"}
            </SP>
          </STitleDiv>
          <ReviewDetailInfo whisky={whisky} />
          <SContentDiv>
            <SContentP>사진 등록(최대 5장)</SContentP>
          </SContentDiv>
          <ImageUploader
            preImages={preImages}
            handlePreImages={handlePreImages}
            handleFiles={handleFiles}
            files={files}
            maxNum={5}
          />
          <SContentDiv>
            <SContentP>리뷰 내용</SContentP>
          </SContentDiv>
          <ReviewContent content={content} setContent={setContent} />
          <SContentDiv style={{ justifyContent: "center" }}>
            <SContentP>평점 등록</SContentP>
          </SContentDiv>
          <ReviewRating rating={rating} setRating={setRating} />
          <div type="submit" className="container container-two" onClick={reviewSave}>
            <button className="selected-button">
              <SButtonText>{isCreate ? "작성 완료" : "수정 완료"}</SButtonText>
              <div className="fill-two"></div>
            </button>
          </div>
        </SContainer>
      </form>
    </>
  );
};

export default AppReview;

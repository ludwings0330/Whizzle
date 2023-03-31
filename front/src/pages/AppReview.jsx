import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { changeHeader, rollbackHeader } from "../hooks/changeHeader";
import { whiskyDetail } from "../apis/whiskyDetail";
import { reviewCreate } from "../apis/review";

//import images
import ImageUploader from "../components/review/create/ImageUploader";

//import components
import ReviewContent from "../components/review/create/ReviewContent";
import ReviewDetailInfo from "../components/review/create/ReviewDetailInfo";
import ReviewRating from "../components/review/create/ReviewRating";
import { useNavigate, useParams } from "react-router";

const SContainer = styled.div`
  margin-top: 130px;
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

const SButton = styled.button`
  background-image: linear-gradient(90deg, #f84f5a 11.68%, #f2a660 86.99%);
  width: 394px;
  height: 74px;
  border-radius: 999px;
  margin-top: 90px;
  margin-bottom: 130px;
  font-size: 18px;
  font-family: Pretendard Variable;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: none;
`;

const SContentP = styled.p`
  font-size: 20px;
  color: #181818;
  font-weight: bold;
  margin-top: 70px;
`;

const SContentDiv = styled.div`
  width: 830px;
  display: flex;
  align-items: left;
`;

//리뷰작성 페이지
const AppReview = () => {
  const navigate = useNavigate();
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
    setPreImages(preImages.filter((image) => image.uid !== id));
  };

  const handleFiles = (datas) => {
    setFiles(datas);
  };

  const reviewSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("whiskyId", whiskyId);
    formData.append("rating", rating);
    if (content !== "") {
      formData.append("content", content);
    }
    console.log(whiskyId, rating, content, files);
    if (files !== []) {
      files.forEach((file) => {
        formData.append("reviewImageFiles", file);
      });
    }

    try {
      await reviewCreate(formData);
      navigate(`/review/${whiskyId}`);
    } catch {
      console.log("리뷰 저장 실패");
    }
  };

  const getWhiskyInfo = async (id) => {
    try {
      const whiskyData = await whiskyDetail(whiskyId);
      // console.log(whiskyData);
      setWhisky(whiskyData);
    } catch {
      console.log("위스키 정보 조회 실패");
    }
  };

  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  useEffect(() => {
    getWhiskyInfo();

    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, []);

  return (
    <>
      <form encType="multipart/form-data">
        <SContainer>
          <STitleDiv>
            <STitleP>리뷰 작성</STitleP>
            <SP>아래 위스키에 대한 리뷰를 작성해주세요</SP>
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
          <SButton type="submit" onClick={reviewSave}>
            작성 완료
          </SButton>
        </SContainer>
      </form>
    </>
  );
};

export default AppReview;

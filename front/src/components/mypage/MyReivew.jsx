import React from "react";
import styled from "styled-components";

import MyReviewItem from "./MyReviewItem";

const SBox = styled.div`
  border: 1px solid black;
`;

const SContainer = styled.div`
  width: 304px;
  height: 387px;

  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-bottom: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SListDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
  margin-bottom: 100px;
`;

const reviews = [
  {
    whiskyName: "Hibiki 21 Year",
    rating: 3.0,
    content: "content",
    likeCount: 0,
    createdDateTime: "2023-03-23T00:00:09",
    reviewId: 448566,
  },
  {
    whiskyName:
      "Middle West Spirits Sherry Cask Finished Bourbon Middle West Spirits Sherry Cask Finished Bourbon",
    rating: 1.0,
    content: "아무말이나 만들어보고 있습니다.",
    likeCount: 0,
    createdDateTime: "2023-03-22T07:46:12",
    reviewId: 1,
  },
  {
    whiskyName: "Springbank 17 Year Madeira Wood",
    rating: 2.0,
    content:
      "이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 하하하 즐겁네요.",
    likeCount: 0,
    createdDateTime: "2023-03-22T07:46:12",
    reviewId: 2,
  },
  {
    whiskyName: "Hirsch Small Batch Reserve Straight Bourbon",
    rating: 3.0,
    content:
      "이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 하하하 이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 하하하",
    likeCount: 0,
    createdDateTime: "2023-03-22T07:46:12",
    reviewId: 3,
  },
];

const MyReivew = () => {
  return (
    <>
      <SListDiv>
        {reviews.map((review) => {
          return <MyReviewItem key={review.reviewId} review={review} />;
        })}
      </SListDiv>
    </>
  );
};

export default MyReivew;

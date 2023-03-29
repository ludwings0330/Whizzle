import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { reviewApi } from "../../apis/mypage";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";

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

const SWarning = styled.div`
  width: 1000px;
  height: 290px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

// const reviews = [
//   {
//     whiskyName: "Hibiki 21 Year",
//     rating: 3.0,
//     content: "content",
//     likeCount: 0,
//     createdDateTime: "2023-03-23T00:00:09",
//     reviewId: 448566,
//   },
//   {
//     whiskyName:
//       "Middle West Spirits Sherry Cask Finished Bourbon Middle West Spirits Sherry Cask Finished Bourbon",
//     rating: 1.0,
//     content: "아무말이나 만들어보고 있습니다.",
//     likeCount: 0,
//     createdDateTime: "2023-03-22T07:46:12",
//     reviewId: 1,
//   },
//   {
//     whiskyName: "Springbank 17 Year Madeira Wood",
//     rating: 2.0,
//     content:
//       "이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 하하하 즐겁네요.",
//     likeCount: 0,
//     createdDateTime: "2023-03-22T07:46:12",
//     reviewId: 2,
//   },
//   {
//     whiskyName: "Hirsch Small Batch Reserve Straight Bourbon",
//     rating: 3.0,
//     content:
//       "이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 하하하 이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다. 하하하",
//     likeCount: 0,
//     createdDateTime: "2023-03-22T07:46:12",
//     reviewId: 3,
//   },
// ];

const MyReivew = () => {
  const user = useRecoilValue(userState);
  const id = user.id;
  const [reviews, setReviews] = useState([]);

  const myReviewApi = async () => {
    const params = {
      baseId: reviews.length > 0 ? reviews[reviews.length - 1].reviewId : 0,
      reviewOrder: "RECENT",
    };

    const myReviews = await reviewApi(id, params);
    setReviews(myReviews);
  };

  useEffect(() => {
    myReviewApi();
  }, []);

  return (
    <>
      <SListDiv>
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return <MyReviewItem key={review.reviewId} review={review} />;
          })
        ) : (
          <SWarning>
            <span>현재 작성한 리뷰가 없습니다</span>
            <span>좋아하는 위스키에 대한 리뷰를 작성해보세요!</span>
          </SWarning>
        )}
      </SListDiv>
    </>
  );
};

export default MyReivew;

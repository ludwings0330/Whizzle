import React, { useState } from "react";
import styled from "styled-components";
import WhiskyDetailReviewItem from "./WhiskyDetailReviewItem";
import WhiskyDetailMyReviewItem from "./WhiskyDetailMyReviewItem";

const Wrapper = styled.div`
  margin-top: 100px;
`;

const SHeadDiv = styled.div`
  width: 990px;
  display: flex;
  justify-content: space-between;
`;

const SP = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const SSpan = styled.span`
  color: #f84f5a;
`;

const SOrderSpan = styled.span`
  cursor: pointer;
`;

//위스키 상세페이지에 띄워줄 해당 위스키의 리뷰목록
const WhiskyDetailReview = (props) => {
  const whisky = props.whisky;
  const reviews = props.reviews;
  const myReview = props.myReview;
  const [sortByLike, setSortByLike] = useState(true);

  const orderChange = (e) => {
    if (e.target.innerText === "좋아요순") {
      setSortByLike(true);
    } else if (e.target.innerText === "최신순") {
      setSortByLike(false);
    }
  };

  return (
    <Wrapper>
      <SHeadDiv>
        <SP>
          <SSpan>{whisky?.reviewCount}</SSpan>건의 리뷰
        </SP>
        <SP style={{ fontSize: "20px" }}>
          <SOrderSpan
            onClick={orderChange}
            style={{ fontWeight: sortByLike ? 700 : 400, marginRight: "24px" }}
          >
            좋아요순
          </SOrderSpan>
          <span style={{ fontWeight: "400" }}>|</span>
          <SOrderSpan
            onClick={orderChange}
            style={{ fontWeight: !sortByLike ? 700 : 400, marginLeft: "24px" }}
          >
            최신순
          </SOrderSpan>
        </SP>
      </SHeadDiv>
      {myReview && myReview.length
        ? myReview.map((review) => {
            return (
              <WhiskyDetailMyReviewItem
                key={review.reviewInfo.reviewId}
                whiskyId={props.id}
                review={review}
              />
            );
          })
        : null}
      {reviews && reviews.length
        ? reviews.map((review) => {
            return <WhiskyDetailReviewItem key={review.reviewInfo.reviewId} review={review} />;
          })
        : null}
    </Wrapper>
  );
};

export default WhiskyDetailReview;

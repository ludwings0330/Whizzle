import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { reviewApi } from "../../apis/mypage";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";

import MyReviewItem from "./MyReviewItem";

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
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const MyReivew = ({ memberId }) => {
  const user = useRecoilValue(userState);
  const memberIdToUse = memberId ?? user.id;

  const [reviews, setReviews] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          myReviewApi();
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (observerRef.current && !isLast) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, lastId, memberIdToUse]);

  const myReviewApi = async () => {
    if (!isLoading && !isLast) {
      setIsLoading(true);

      try {
        const params = {
          baseId: lastId,
          reviewOrder: "RECENT",
        };
        const myReviews = await reviewApi(memberIdToUse, params);
        if (myReviews.length > 0) {
          setReviews((prev) => {
            return [...prev, ...myReviews];
          });
          setLastId(myReviews[myReviews.length - 1].reviewId);
        } else {
          setIsLast(true);
        }
      } catch {}
      setIsLoading(false);
    }
  };

  return (
    <>
      <SListDiv>
        {reviews.length > 0 ? (
          reviews.map((review, index) => {
            return <MyReviewItem key={index} review={review} />;
          })
        ) : (
          <SWarning>
            <span>현재 작성한 리뷰가 없습니다</span>
            <span>좋아하는 위스키에 대한 리뷰를 작성해보세요!</span>
          </SWarning>
        )}
        <div ref={observerRef}></div>
      </SListDiv>
    </>
  );
};

export default MyReivew;

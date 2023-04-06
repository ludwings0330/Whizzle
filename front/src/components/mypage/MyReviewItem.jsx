import React from "react";
import styled from "styled-components";
import ReactStars from "react-stars";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const SDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 700px;
  max-height: 113px;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  padding: 30px;
`;

const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SName = styled.div`
  max-width: 84%;
  font-size: 20px;
  font-weight: bold;
`;

const SRating = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const SContent = styled.div`
  font-size: 18px;
  line-height: 24px;
  margin-top: 15px;
`;

const SExtra = styled.div`
  margin-left: auto;
  margin-top: 20px;
  margin-right: 45px;
  font-size: 16px;
  color: #787878;
`;

const SLine = styled.hr`
  border: 0;
  height: 1px;
  background: #ccc;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const MyReviewItem = ({ review }) => {
  const truncateName = (text) => {
    if (text.length <= 50) {
      return text;
    }
    return text.slice(0, 50) + "...";
  };

  const truncateContent = (text) => {
    if (text?.length <= 163) {
      return text;
    }
    return text?.slice(0, 163) + "...";
  };

  const TimeSince = ({ date }) => {
    const yearsAgo = moment().diff(date, "years");
    const monthsAgo = moment().diff(date, "months");
    const weeksAgo = moment().diff(date, "weeks");
    const daysAgo = moment().diff(date, "days");
    const hoursAgo = moment().diff(date, "hours");
    const minutesAgo = moment().diff(date, "minutes");

    if (yearsAgo > 0) {
      return <span>{`${yearsAgo}년 전`}</span>;
    } else if (monthsAgo > 0) {
      return <span>{`${monthsAgo}달 전`}</span>;
    } else if (weeksAgo > 0) {
      return <span>{`${weeksAgo}주 전`}</span>;
    } else if (daysAgo > 0) {
      return <span>{`${daysAgo}일 전`}</span>;
    } else if (hoursAgo > 0) {
      return <span>{`${hoursAgo}시간 전`}</span>;
    } else if (minutesAgo > 0) {
      return <span>{`${minutesAgo}분 전`}</span>;
    } else {
      return <span>방금 전</span>;
    }
  };

  const truncatedName = truncateName(review.whiskyName);
  const truncatedContent = truncateContent(review.content);

  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/whisky/${review.whiskyId}?review=true`);
  };

  return (
    <SDiv onClick={onClickHandler}>
      <SBox>
        <SContainer>
          <SName>{truncatedName}</SName>
          <SRating>
            <ReactStars
              count={5}
              value={Math.round(review.rating * 2) / 2}
              edit={false}
              size={20}
              color1={"rgba(128, 128, 128, 0.2)"}
              color2={"#F84F5A"}
            />
          </SRating>
        </SContainer>
        <SContent>{review?.content}</SContent>
      </SBox>
      <SExtra>
        <TimeSince date={review.createdDateTime} /> • 좋아요 {review.likeCount}
      </SExtra>
      <SLine />
    </SDiv>
  );
};

export default MyReviewItem;

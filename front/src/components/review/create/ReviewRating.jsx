import React from "react";
import styled from "styled-components";
import ReactStars from "react-stars";

const SRatingDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledReactStars = styled(ReactStars)`
  .react-stars {
    border-color: black;
  }

  .react-stars .react-stars__star--selected {
    border-color: black;
  }
`;

const ReviewRating = ({ rating, setRating }) => {
  const ratingChange = (e) => {
    const ratingValue = parseFloat(e);
    setRating(ratingValue);
  };

  return (
    <SRatingDiv>
      <StyledReactStars
        count={5}
        value={rating}
        edit={true}
        size={45}
        color1={"rgba(128, 128, 128, 0.2)"}
        color2={"#F84F5A"}
        onChange={ratingChange}
      />
    </SRatingDiv>
  );
};

export default ReviewRating;

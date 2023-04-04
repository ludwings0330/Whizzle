import React from "react";
import styled from "styled-components";
import defaultImg from "../../assets/img/main.png";

const SReview = styled.div`
  width: 31vh;
  height: 38vh;
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  overflow: hidden;
`;

const SImg = styled.img`
  width: 100%;
  height: 45%;
  object-fit: cover;
`;

const MainReviewItem = (props) => {
  return (
    <>
      {props.index % 2 === 1 ? (
        <SReview style={{ marginTop: "40px" }}>
          <SImg src={defaultImg} />
        </SReview>
      ) : (
        <SReview>
          <SImg src={defaultImg} />
        </SReview>
      )}
    </>
  );
};

export default MainReviewItem;

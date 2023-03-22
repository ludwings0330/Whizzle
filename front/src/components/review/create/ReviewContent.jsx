import React from "react";
import styled from "styled-components";

const SDiv = styled.div``;

const STextarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  line-height: 1.4;
  border: 1px solid #adadad;
  border-radius: 8px;
  box-sizing: border-box;
  resize: vertical;
  height: 300px;
  width: 930px;
`;

const ReviewContent = () => {
  return (
    <>
      <SDiv>
        <STextarea />
      </SDiv>
    </>
  );
};

export default ReviewContent;

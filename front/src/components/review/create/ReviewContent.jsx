import React from "react";
import styled from "styled-components";

const SDiv = styled.div``;

const STextarea = styled.textarea`
  padding: 25px;
  font-size: 18px;
  line-height: 1.4;
  border: 1px solid #adadad;
  border-radius: 8px;
  box-sizing: border-box;
  resize: vertical;
  height: 267px;
  width: 830px;
  color: #363636;
  font-family: Pretendard Variable;
  background: #fcfcfc;
  &:focus {
    outline: 0;
    background: none;
  }
`;

const ReviewContent = ({ content, setContent }) => {
  const contentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <SDiv>
        <STextarea onChange={contentChange} name="content" type="text" value={content} />
      </SDiv>
    </>
  );
};

export default ReviewContent;

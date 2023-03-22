import React from "react";
import styled from "styled-components";

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
  width: 990px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  align-items: flex-start;

  & > * {
    :not(:last-child) {
      margin-right: 10px;
    }
  }
`;

//마이페이지 내가 작성한 리뷰
const MyReivew = () => {
  return (
    <>
      <SListDiv>
        <SContainer>
          <p>내가 작성한 리뷰</p>
        </SContainer>
      </SListDiv>
    </>
  );
};

export default MyReivew;

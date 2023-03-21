import React from "react";
import styled from "styled-components";

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

const WhiskySimilarListItem = () => {
  return (
    <SContainer>
      <p>유사한 위스키</p>
    </SContainer>
  );
};

export default WhiskySimilarListItem;

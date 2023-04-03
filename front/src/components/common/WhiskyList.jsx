import React from "react";
import styled from "styled-components";

import WhiskyListItem from "./WhiskyListItem";

const SWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 50px 23px;
  margin-top: 90px;
  margin-bottom: 150px;
  width: 830px;
`;

const WhiskyList = (props) => {
  return (
    <>
      <SWrapper>
        {props.whiskys?.map((whisky, index) => {
          return <WhiskyListItem key={index} whisky={whisky} />;
        })}
      </SWrapper>
    </>
  );
};

export default WhiskyList;

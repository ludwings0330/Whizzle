import React from "react";
import styled from "styled-components";

import WhiskyListItem from "./WhiskyListItem";

const SWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px 23px;
  margin-top: 70px;
  margin-bottom: 150px;
  width: 1000px;
`;

const WhiskyList = (props) => {
  return (
    <>
      <SWrapper>
        {props.whiskys?.map((whisky) => {
          return <WhiskyListItem key={whisky.id} whisky={whisky} />;
        })}
      </SWrapper>
    </>
  );
};

export default WhiskyList;

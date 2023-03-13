import React from "react";
import styled from "styled-components";

const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90vh;
`;

const SCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const STitle = styled.p`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
`;

const SButton = styled.button``;

//추천 세번째 질문 -> 위스키를 마셔봤는지에 대해 물어봄
const QuestionExperience = (props) => {
  const isExperienceSelectHandler = (event) => {
    props.setIsExperience(event.target.value);

    if (event.target.value === "true") {
      props.setActivePage(4);
    } else if (event.target.value === "false") {
      props.setActivePage(5);
    }
  };

  const nextPageHandler = () => {
    if (props.isExperience === "true") {
      props.setActivePage(4);
    } else if (props.isExperience === "false") {
      props.setActivePage(5);
    } else {
      alert("해당되는 내용을 선택해주세요!");
    }
  };

  return (
    <SDiv>
      <SButton onClick={props.goPriorPage}>이전</SButton>
      <SCentered>
        <STitle>위스키에 대해 어느정도 알고 계신가요?</STitle>
        <label>
          <input
            type="radio"
            value="false"
            checked={props.isExperience === "false"}
            onChange={isExperienceSelectHandler}
          />
          위스키에 대해 잘 알지 못해요
        </label>
        <label>
          <input
            type="radio"
            value="true"
            checked={props.isExperience === "true"}
            onChange={isExperienceSelectHandler}
          />
          위스키를 즐기는 편이에요!
        </label>
      </SCentered>
      <SButton onClick={nextPageHandler}>다음</SButton>
    </SDiv>
  );
};

export default QuestionExperience;

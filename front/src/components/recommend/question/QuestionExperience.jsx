import React from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/preferenceStore";
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
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);

  const isExperienceSelectHandler = (event) => {
    const selectedValue = event.target.value;
    setPreferenceValue((prev) => ({
      ...prev,
      isExperience: selectedValue,
    }));

    if (selectedValue === "true") {
      props.setActivePage(4);
    } else if (selectedValue === "false") {
      props.setActivePage(5);
    }
  };

  const nextPageHandler = () => {
    if (preferenceValue.isExperience === "true") {
      props.setActivePage(4);
    } else if (preferenceValue.isExperience === "false") {
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
            checked={preferenceValue.isExperience === "false"}
            onChange={isExperienceSelectHandler}
          />
          위스키에 대해 잘 알지 못해요
        </label>
        <label>
          <input
            type="radio"
            value="true"
            checked={preferenceValue.isExperience === "true"}
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

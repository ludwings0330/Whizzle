import React, { useState } from "react";
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

const SQuestion = styled.div`
  display: flex;
`;

const STitle = styled.p`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
`;

const SButton = styled.button``;

//추천 첫 질문 성별, 나이
const QuestionFilter = (props) => {
  const genderSelectHandler = (event) => {
    props.setSelectedGender(event.target.value);

    if (props.selectedAge) {
      props.goNextPage();
    }
  };

  const ageSelectHandler = (event) => {
    props.setSelectedAge(event.target.value);

    if (props.selectedGender) {
      props.goNextPage();
    }
  };

  const nextPageHandler = () => {
    if (props.selectedAge && props.selectedGender) {
      props.goNextPage();
    } else {
      alert("헤당되는 내용을 선택해주세요!");
    }
  };

  return (
    <SDiv>
      <div></div>
      <SCentered>
        <STitle>성별과 연령대를 알려주세요</STitle>
        {/* 성별 */}
        <SQuestion>
          <label>
            <input
              type="radio"
              value="female"
              checked={props.selectedGender === "female"}
              onChange={genderSelectHandler}
            />
            여성
          </label>
          <label>
            <input
              type="radio"
              value="male"
              checked={props.selectedGender === "male"}
              onChange={genderSelectHandler}
            />
            남성
          </label>
        </SQuestion>

        {/* 연령대 */}
        <SQuestion>
          <label>
            <input
              type="radio"
              value="20"
              checked={props.selectedAge === "20"}
              onChange={ageSelectHandler}
            />
            20대
          </label>
          <label>
            <input
              type="radio"
              value="30"
              checked={props.selectedAge === "30"}
              onChange={ageSelectHandler}
            />
            30대
          </label>
          <label>
            <input
              type="radio"
              value="40"
              checked={props.selectedAge === "40"}
              onChange={ageSelectHandler}
            />
            40대
          </label>
          <label>
            <input
              type="radio"
              value="50"
              checked={props.selectedAge === "50"}
              onChange={ageSelectHandler}
            />
            50대 이상
          </label>
        </SQuestion>
      </SCentered>
      <SButton onClick={nextPageHandler}>다음</SButton>
    </SDiv>
  );
};

export default QuestionFilter;

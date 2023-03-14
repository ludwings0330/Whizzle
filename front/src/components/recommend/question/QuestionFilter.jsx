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
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);

  const genderSelectHandler = (event) => {
    const selectedGender = event.target.value;
    setPreferenceValue((prev) => ({ ...prev, gender: selectedGender }));

    if (preferenceValue.age) {
      props.goNextPage();
    }
  };

  const ageSelectHandler = (event) => {
    const selectedAge = event.target.value;
    setPreferenceValue((prev) => ({ ...prev, age: selectedAge }));

    if (preferenceValue.gender) {
      props.goNextPage();
    }
  };

  const nextPageHandler = () => {
    if (preferenceValue.age && preferenceValue.gender) {
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
              checked={preferenceValue.gender === "female"}
              onChange={genderSelectHandler}
            />
            여성
          </label>
          <label>
            <input
              type="radio"
              value="male"
              checked={preferenceValue.gender === "male"}
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
              checked={preferenceValue.age === "20"}
              onChange={ageSelectHandler}
            />
            20대
          </label>
          <label>
            <input
              type="radio"
              value="30"
              checked={preferenceValue.age === "30"}
              onChange={ageSelectHandler}
            />
            30대
          </label>
          <label>
            <input
              type="radio"
              value="40"
              checked={preferenceValue.age === "40"}
              onChange={ageSelectHandler}
            />
            40대
          </label>
          <label>
            <input
              type="radio"
              value="50"
              checked={preferenceValue.age === "50"}
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

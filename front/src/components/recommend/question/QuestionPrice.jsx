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

//추천 두번째 질문 -> 가격을 물어봄
const QuestionPrice = (props) => {
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);

  const priceSelectHandler = (event) => {
    const selectedPrice = event.target.value;
    setPreferenceValue((prev) => ({ ...prev, price: selectedPrice }));

    props.goNextPage();
  };

  const nextPageHandler = () => {
    if (preferenceValue.price) {
      props.goNextPage();
    } else {
      alert("헤당되는 내용을 선택해주세요!");
    }
  };

  return (
    <SDiv>
      <SButton onClick={props.goPriorPage}>이전</SButton>
      <SCentered>
        <STitle>구매 가능한 가격대를 선택해주세요.</STitle>
        <label>
          <input
            type="radio"
            value="1"
            checked={preferenceValue.price === "1"}
            onChange={priceSelectHandler}
          />
          ₩50,000원 이하
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={preferenceValue.price === "2"}
            onChange={priceSelectHandler}
          />
          ₩50,000원 이상 ₩100,000원 이하
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={preferenceValue.price === "3"}
            onChange={priceSelectHandler}
          />
          ₩100,000원 이상 ₩200,000원 이하
        </label>
        <label>
          <input
            type="radio"
            value="4"
            checked={preferenceValue.price === "4"}
            onChange={priceSelectHandler}
          />
          ₩200,000원 이상 ₩350,000원 이하
        </label>
        <label>
          <input
            type="radio"
            value="5"
            checked={preferenceValue.price === "5"}
            onChange={priceSelectHandler}
          />
          ₩350,000원 이상
        </label>
      </SCentered>

      <SButton onClick={nextPageHandler}>다음</SButton>
    </SDiv>
  );
};

export default QuestionPrice;

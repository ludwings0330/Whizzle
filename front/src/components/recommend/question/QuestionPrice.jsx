import React from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/preferenceStore";
import styled from "styled-components";
import { motion } from "framer-motion";
import navigateNext from "../../../assets/img/navigate_next.png";
import navigatePrev from "../../../assets/img/navigate_prev.png";

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(
    125.02deg,
    #f84f5a 28.12%,
    #f7875a 65.62%,
    #f7cb5a 100%
  );
`;

const SCentered = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

const STitle = styled.p`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const SRadioInput = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  width: 0;
  &:checked + label {
    background-color: #00a3ff;
    // border: 1px solid #00a3ff;
    transition: 0.5s;
  }
`;

const SRadioLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  width: 134px;
  height: 164px;
  background-color: rgba(255, 255, 255, 0.2);
  // border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  color: white;
  font-size: 18px;
  transition: 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const SNavigate = styled.div`
  cursor: pointer;
  position: fixed;
`;

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

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <SDiv>
      <STitle>구매 가능한 가격대를 선택해주세요</STitle>
      <motion.div layout transition={spring}>
        <SCentered>
          <SRadioInput
            id="one"
            type="radio"
            value="1"
            checked={preferenceValue.price === "1"}
            onChange={priceSelectHandler}
          />
          <SRadioLabel htmlFor="one">5만원 이하</SRadioLabel>
          <SRadioInput
            id="two"
            type="radio"
            value="2"
            checked={preferenceValue.price === "2"}
            onChange={priceSelectHandler}
          />
          <SRadioLabel htmlFor="two">
            <span>5만원 이상</span>
            <span>10만원 이하</span>
          </SRadioLabel>
          <SRadioInput
            id="three"
            type="radio"
            value="3"
            checked={preferenceValue.price === "3"}
            onChange={priceSelectHandler}
          />
          <SRadioLabel htmlFor="three">
            ₩100,000원 이상 ₩200,000원 이하
          </SRadioLabel>
          <SRadioInput
            id="four"
            type="radio"
            value="4"
            checked={preferenceValue.price === "4"}
            onChange={priceSelectHandler}
          />
          <SRadioLabel htmlFor="four">
            ₩200,000원 이상 ₩350,000원 이하
          </SRadioLabel>
          <SRadioInput
            id="five"
            type="radio"
            value="5"
            checked={preferenceValue.price === "5"}
            onChange={priceSelectHandler}
          />
          <SRadioLabel htmlFor="five">₩350,000원 이상</SRadioLabel>
        </SCentered>
      </motion.div>

      <SNavigate onClick={props.goPriorPage} style={{ left: "0%" }}>
        <img src={navigatePrev} alt="navigate" />
      </SNavigate>
      <SNavigate onClick={nextPageHandler} style={{ right: "0%" }}>
        <img src={navigateNext} alt="navigate" />
      </SNavigate>
    </SDiv>
  );
};

export default QuestionPrice;

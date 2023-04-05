import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SCentered = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
`;

const STitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  font-size: 24px;
  font-weight: bold;
  color: #666666;
`;

const SRadioInput = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  width: 0;
  &:checked + label {
    color: rgba(248, 79, 90, 0.9);
  }
`;

const SRadioLabel = styled.label`
  display: flex;
  position: relative;
  z-index: 100;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 134px;
  height: 164px;
  border-radius: 10px;
  color: #888888;
  font-size: 16px;
  font-weight: bold;
  transition: 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SCircle = styled.div`
  box-sizing: border-box;
  z-index: 300;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  margin-bottom: 25px;
  background: rgba(248, 79, 90, 0.2);
  border: 2px solid rgba(248, 79, 90, 0.5);
  transform: matrix(1, 0, 0, -1, 0, 0);
`;

const SLine = styled.div`
  position: absolute;
  z-index: 100;
  width: 615px;
  margin-bottom: 62px;
  border: 1px solid rgba(248, 79, 90, 0.5);
`;

const ResponsiveSLine = styled(SLine)`
  @media (max-width: 760px) {
    display: none;
  }
`;

const selectedStyle = {
  position: "absolute",
  zIndex: "-1",
  width: "115px",
  height: "150px",
  borderRadius: "16px",
  backgroundColor: "rgba(255, 202, 205, 0.28)",
};

//추천 두번째 질문 -> 가격을 물어봄
const DailyPrice = (props) => {
  const priceSelectHandler = (event) => {
    const selectedPrice = event.target.value;
    props.setPreference((prev) => {
      return { ...prev, priceTier: Number(selectedPrice) };
    });
  };

  return (
    <>
      <STitle>구매 가능한 가격대를 선택해주세요</STitle>
      <SCentered>
        <SRadioInput
          id="one"
          type="radio"
          value="1"
          checked={props.preference.priceTier === 1}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="one">
          <SCircle />
          <span>5만원 이하</span>
          <span>&nbsp;</span>
          {props.preference.priceTier === 1 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <SRadioInput
          id="two"
          type="radio"
          value="2"
          checked={props.preference.priceTier === 2}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="two">
          <SCircle />
          <span>5만원 이상</span>
          <span>10만원 이하</span>
          {props.preference.priceTier === 2 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <SRadioInput
          id="three"
          type="radio"
          value="3"
          checked={props.preference.priceTier === 3}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="three">
          <SCircle />
          <span>10만원 이상</span>
          <span>20만원 이하</span>
          {props.preference.priceTier === 3 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <SRadioInput
          id="four"
          type="radio"
          value="4"
          checked={props.preference.priceTier === 4}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="four">
          <SCircle />
          <span>20만원 이상</span>
          <span>35만원 이하</span>
          {props.preference.priceTier === 4 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <SRadioInput
          id="five"
          type="radio"
          value="5"
          checked={props.preference.priceTier === 5}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="five">
          <SCircle />
          <span>35만원 이상</span>
          <span>&nbsp;</span>
          {props.preference.priceTier === 5 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <ResponsiveSLine />
      </SCentered>
    </>
  );
};

export default DailyPrice;

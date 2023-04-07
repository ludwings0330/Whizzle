import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/indexStore";
import styled from "styled-components";
import { motion } from "framer-motion";

const slide = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const SCentered = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  padding-top: ${(props) => (props.isMobile ? "20px" : "50px")};
  margin-left: ${(props) => (props.isMobile ? "5vw" : "0px")};
  margin-right: ${(props) => (props.isMobile ? "5vw" : "0px")};
`;

const STitle = styled.p`
  text-align: center;
  font-size: ${(props) => (props.isMobile ? "1.6rem" : "32px")};
  font-weight: bold;
  color: white;
`;

const SRadioInput = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  width: 0;
`;

const SRadioLabel = styled.label`
  display: flex;
  position: relative;
  z-index: 100;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 125px;
  height: 164px;
  border-radius: 25px;
  color: white;
  font-size: 18px;
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
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid #ffffff;
  transform: matrix(1, 0, 0, -1, 0, 0);
`;

const SLine = styled.div`
  position: absolute;
  z-index: 100;
  width: 580px;
  margin-bottom: 68px;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const ResponsiveSLine = styled(SLine)`
  @media (max-width: 760px) {
    display: none;
  }
`;

const selectedStyle = {
  position: "absolute",
  zIndex: "-1",
  width: "125px",
  height: "164px",
  borderRadius: "25px",
  backgroundColor: "#00a3ff",
};

//추천 두번째 질문 -> 가격을 물어봄
const QuestionPrice = (props) => {
  const isMobile = props.isMobile;
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);

  const priceSelectHandler = (event) => {
    const selectedPrice = event.target.value;
    setPreferenceValue((prev) => ({
      ...prev,
      priceTier: Number(selectedPrice),
    }));

    props.setDirection("next");
    props.setActivePage((prev) => (props.activePage === 4 ? prev + 2 : prev + 1));
  };

  useEffect(() => {
    props.setBarWidth(window.innerWidth * 0.5);
  });

  return (
    <motion.div
      style={slide}
      variants={props.pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={props.direction}
    >
      <STitle isMobile={isMobile}>구매 가능한 가격대를 선택해주세요</STitle>
      <SCentered isMobile={isMobile}>
        <SRadioInput
          id="one"
          type="radio"
          value="1"
          checked={preferenceValue.priceTier === 1}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="one">
          <SCircle />
          <span>5만원 이하</span>
          <span>&nbsp;</span>
          {preferenceValue.priceTier === 1 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <SRadioInput
          id="two"
          type="radio"
          value="2"
          checked={preferenceValue.priceTier === 2}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="two">
          <SCircle />
          <span>5만원 이상</span>
          <span>10만원 이하</span>
          {preferenceValue.priceTier === 2 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <SRadioInput
          id="three"
          type="radio"
          value="3"
          checked={preferenceValue.priceTier === 3}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="three">
          <SCircle />
          <span>10만원 이상</span>
          <span>20만원 이하</span>
          {preferenceValue.priceTier === 3 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <SRadioInput
          id="four"
          type="radio"
          value="4"
          checked={preferenceValue.priceTier === 4}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="four">
          <SCircle />
          <span>20만원 이상</span>
          <span>35만원 이하</span>
          {preferenceValue.priceTier === 4 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <SRadioInput
          id="five"
          type="radio"
          value="5"
          checked={preferenceValue.priceTier === 5}
          onChange={priceSelectHandler}
        />
        <SRadioLabel htmlFor="five">
          <SCircle />
          <span>35만원 이상</span>
          <span>&nbsp;</span>
          {preferenceValue.priceTier === 5 ? (
            <motion.div style={selectedStyle} layoutId="selectedBox" />
          ) : (
            ""
          )}
        </SRadioLabel>
        <ResponsiveSLine />
      </SCentered>
    </motion.div>
  );
};

export default QuestionPrice;

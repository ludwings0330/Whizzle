import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/indexStore";
import styled from "styled-components";
import { motion } from "framer-motion";
import checkImg from "../../../assets/img/check.png";
import wonderImg from "../../../assets/img/wonder.png";
import cheersImg from "../../../assets/img/cheers.png";

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
`;

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
  justify-content: center;
  align-items: center;
  margin-top: 35px;
  gap: 30px;
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
    border: 1px solid #00a3ff;
    transition: 0.5s;
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const SRadioLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  width: 437px;
  height: 398px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  color: white;
  font-size: 20px;
  transition: 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

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
      props.setDirection("next");
      props.setActivePage(4);
    } else if (selectedValue === "false") {
      props.setDirection("next");
      props.setActivePage(5);
    }
  };

  useEffect(() => {
    props.setBarWidth(window.innerWidth * 0.75);
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
      <STitle>위스키에 대해 어느정도 알고 계신가요?</STitle>
      <SCentered>
        <SRadioInput
          id="false"
          type="radio"
          value="false"
          checked={preferenceValue.isExperience === "false"}
          onChange={isExperienceSelectHandler}
        />
        <SRadioLabel htmlFor="false">
          <img src={checkImg} alt="check" style={{ marginRight: "auto", marginLeft: "20px" }} />
          <span style={{ fontWeight: "bold", marginTop: "25px" }}>위스키가 뭐징?</span>
          <span>위스키에 대해 잘 알지 못해요</span>
          <img
            src={wonderImg}
            alt="wonder"
            style={{
              marginTop: "20px",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          />
        </SRadioLabel>
        <SRadioInput
          id="true"
          type="radio"
          value="true"
          checked={preferenceValue.isExperience === "true"}
          onChange={isExperienceSelectHandler}
        />
        <SRadioLabel htmlFor="true">
          <img src={checkImg} alt="check" style={{ marginRight: "auto", marginLeft: "20px" }} />
          <span style={{ fontWeight: "bold", marginTop: "15px" }}>위스키를 즐기는 편이에요!</span>
          <span>내가 좋아하는 위스키의 종류를</span>
          <span>이야기할 수 있어요</span>
          <img
            src={cheersImg}
            alt="wonder"
            style={{
              marginTop: "25px",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          />
        </SRadioLabel>
      </SCentered>
    </motion.div>
  );
};

export default QuestionExperience;

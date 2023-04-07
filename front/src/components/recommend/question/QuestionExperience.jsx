import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/indexStore";
import styled from "styled-components";
import { motion } from "framer-motion";
import checkImg from "../../../assets/img/check.png";
import wonderImg from "../../../assets/img/wonder.png";
import cheersImg from "../../../assets/img/cheers.png";

const slide = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const mobileSlide = {
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
  margin-left: ${(props) => (props.isMobile ? "5vw" : "0px")};
  margin-right: ${(props) => (props.isMobile ? "5vw" : "0px")};
`;

const STitle = styled.p`
  text-align: center;
  font-size: ${(props) => (props.isMobile ? "1.5rem" : "32px")};
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
  }
`;

const SRadioLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  width: ${(props) => (props.isMobile ? "60vw" : "437px")};
  height: ${(props) => (props.isMobile ? "60vw" : "398px")};
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

const SImg = styled.img`
  margin-top: 20px;
  width: ${(props) => (props.isMobile ? "65vw" : "auto")};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const SImg2 = styled.img`
  margin-top: ${(props) => (props.isMobile ? "8px" : "25px")};
  width: ${(props) => (props.isMobile ? "65vw" : "auto")};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const STitleSpan = styled.span`
  font-weight: bold;
  margin-top: ${(props) => (props.isMobile ? "0px" : "25px")};
  font-size: ${(props) => (props.isMobile ? "1.2rem" : "20px")};
`;

const SSpan = styled.span`
  font-size: ${(props) => (props.isMobile ? "1rem" : "20px")};
`;

//추천 세번째 질문 -> 위스키를 마셔봤는지에 대해 물어봄
const QuestionExperience = (props) => {
  const isMobile = props.isMobile;
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
      setPreferenceValue((prev) => {
        return {
          ...prev,
          flavor: {
            smoky: 0,
            peaty: 0,
            spicy: 0,
            herbal: 0,
            oily: 0,
            body: 0,
            rich: 0,
            sweet: 0,
            salty: 0,
            vanilla: 0,
            tart: 0,
            fruity: 0,
            floral: 0,
          },
        };
      });
      props.setDirection("next");
      props.setActivePage(5);
    }
  };

  useEffect(() => {
    props.setBarWidth(window.innerWidth * 0.75);
  });

  return (
    <motion.div
      style={isMobile ? mobileSlide : slide}
      variants={props.pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={props.direction}
    >
      <STitle isMobile={isMobile}>위스키에 대해 어느정도 알고 계신가요?</STitle>
      <SCentered isMobile={isMobile}>
        <SRadioInput
          id="false"
          type="radio"
          value="false"
          checked={preferenceValue.isExperience === "false"}
          onChange={isExperienceSelectHandler}
        />
        <SRadioLabel isMobile={isMobile} htmlFor="false">
          {isMobile ? null : (
            <img src={checkImg} alt="check" style={{ marginRight: "auto", marginLeft: "20px" }} />
          )}
          <STitleSpan isMobile={isMobile}>위스키가 뭐징?</STitleSpan>
          <SSpan isMobile={isMobile}>위스키에 대해 잘 알지 못해요</SSpan>
          <SImg isMobile={isMobile} src={wonderImg} alt="wonder" />
        </SRadioLabel>
        <SRadioInput
          id="true"
          type="radio"
          value="true"
          checked={preferenceValue.isExperience === "true"}
          onChange={isExperienceSelectHandler}
        />
        <SRadioLabel isMobile={isMobile} htmlFor="true">
          {isMobile ? null : (
            <img src={checkImg} alt="check" style={{ marginRight: "auto", marginLeft: "20px" }} />
          )}
          <STitleSpan isMobile={isMobile}>위스키를 즐기는 편이에요!</STitleSpan>
          <SSpan isMobile={isMobile}>내가 좋아하는 위스키의 종류를</SSpan>
          <SSpan isMobile={isMobile}>이야기할 수 있어요</SSpan>
          <SImg2 isMobile={isMobile} src={cheersImg} alt="wonder" />
        </SRadioLabel>
      </SCentered>
    </motion.div>
  );
};

export default QuestionExperience;

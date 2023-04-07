import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/indexStore";
import styled from "styled-components";
import { motion } from "framer-motion";
import checkImg from "../../../assets/img/check.png";
import femaleImg from "../../../assets/img/female.png";
import maleImg from "../../../assets/img/male.png";

const slide = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const SCentered = styled.div`
  margin-top: ${(props) => (props.isMobile ? "70px" : "0px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: ${(props) => (props.isMobile ? "10vw" : "0px")};
`;

const SQuestion = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.isMobile ? "5px" : "35px")};
  gap: 30px;
`;

const STitle = styled.p`
  text-align: center;
  font-size: ${(props) => (props.isMobile ? "1.8rem" : "32px")};
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

const SGenderSelector = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  width: ${(props) => (props.isMobile ? "40vw" : "247px")};
  height: ${(props) => (props.isMobile ? "40vw" : "241px")};
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

const SAgeSelector = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: ${(props) => (props.isMobile ? "40vw" : "166px")};
  height: ${(props) => (props.isMobile ? "13.5vw" : "53px")};
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  color: white;
  font-size: 20px;
  transition: 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const SAbove = styled.div`
  width: 87%;
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isMobile ? "55%" : "120px")};
`;

const SGenderImg = styled.img`
  width: ${(props) => (props.isMobile ? "35vw" : "auto")};
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))";
`;

const SMaleImg = styled.img`
  width: ${(props) => (props.isMobile ? "27vw" : "auto")};

  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))";
`;

//추천 첫 질문 성별, 나이
const QuestionFilter = (props) => {
  const isMobile = props.isMobile;
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);

  const genderSelectHandler = (event) => {
    const selectedGender = event.target.value;
    setPreferenceValue((prev) => ({ ...prev, gender: selectedGender }));

    if (preferenceValue.age) {
      props.setDirection("next");
      props.setActivePage((prev) => (props.activePage === 4 ? prev + 2 : prev + 1));
    }
  };

  const ageSelectHandler = (event) => {
    const selectedAge = event.target.value;
    setPreferenceValue((prev) => ({ ...prev, age: selectedAge }));

    if (preferenceValue.gender) {
      props.setDirection("next");
      props.setActivePage((prev) => (props.activePage === 4 ? prev + 2 : prev + 1));
    }
  };

  useEffect(() => {
    props.setBarWidth(window.innerWidth * 0.25);
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
      <SCentered isMobile={isMobile}>
        <STitle isMobile={isMobile}>성별과 연령대를 알려주세요</STitle>
        {/* 성별 */}
        <SQuestion isMobile={isMobile}>
          <SRadioInput
            id="female_btn"
            type="radio"
            value="FEMALE"
            checked={preferenceValue.gender === "FEMALE"}
            onChange={genderSelectHandler}
          />
          <SGenderSelector isMobile={isMobile} htmlFor="female_btn">
            <SAbove isMobile={isMobile} style={isMobile ? null : { marginBottom: "15px" }}>
              {isMobile ? null : <img src={checkImg} alt="check" />}
              {isMobile ? null : <span>여성</span>}
            </SAbove>
            <SGenderImg isMobile={isMobile} src={femaleImg} alt="female" />
          </SGenderSelector>
          <SRadioInput
            id="male_btn"
            type="radio"
            value="MALE"
            checked={preferenceValue.gender === "MALE"}
            onChange={genderSelectHandler}
          />
          <SGenderSelector isMobile={isMobile} htmlFor="male_btn">
            <SAbove isMobile={isMobile}>
              {isMobile ? null : <img src={checkImg} alt="check" />}
              {isMobile ? null : <span>남성</span>}
            </SAbove>
            <SMaleImg isMobile={isMobile} src={maleImg} alt="male" />
          </SGenderSelector>
        </SQuestion>

        {/* 연령대 */}
        <SQuestion>
          <SRadioInput
            id="20_btn"
            type="radio"
            value="TWENTY"
            checked={preferenceValue.age === "TWENTY"}
            onChange={ageSelectHandler}
          />
          <SAgeSelector isMobile={isMobile} htmlFor="20_btn">
            20대
          </SAgeSelector>
          <SRadioInput
            id="30_btn"
            type="radio"
            value="THIRTY"
            checked={preferenceValue.age === "THIRTY"}
            onChange={ageSelectHandler}
          />
          <SAgeSelector isMobile={isMobile} htmlFor="30_btn">
            30대
          </SAgeSelector>
          <SRadioInput
            id="40_btn"
            type="radio"
            value="FORTY"
            checked={preferenceValue.age === "FORTY"}
            onChange={ageSelectHandler}
          />
          <SAgeSelector isMobile={isMobile} htmlFor="40_btn">
            40대
          </SAgeSelector>
          <SRadioInput
            id="50_btn"
            type="radio"
            value="FIFTY"
            checked={preferenceValue.age === "FIFTY"}
            onChange={ageSelectHandler}
          />
          <SAgeSelector isMobile={isMobile} htmlFor="50_btn">
            50대 이상
          </SAgeSelector>
        </SQuestion>
      </SCentered>
    </motion.div>
  );
};

export default QuestionFilter;

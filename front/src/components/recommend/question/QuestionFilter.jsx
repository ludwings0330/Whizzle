import React from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/preferenceStore";
import styled from "styled-components";
import { motion } from "framer-motion";
import checkImg from "../../../assets/img/check.png";
import femaleImg from "../../../assets/img/female.png";
import maleImg from "../../../assets/img/male.png";
import navigateImg from "../../../assets/img/navigate_next.png";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 900px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SQuestion = styled.div`
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

const SGenderSelector = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  width: 247px;
  height: 241px;
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
  width: 166px;
  height: 53px;
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
  display: flex;
  align-items: center;
  gap: 120px;
  width: 87%;
`;

const SNavigate = styled.div`
  cursor: pointer;
  position: fixed;
  right: 0;
`;

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
      alert("해당되는 내용을 선택해주세요!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.6 }}
      transition={{ duration: 0.5 }}
    >
      <SDiv>
        <SCentered>
          <STitle>성별과 연령대를 알려주세요</STitle>
          {/* 성별 */}
          <SQuestion>
            <SRadioInput
              id="female_btn"
              type="radio"
              value="FEMALE"
              checked={preferenceValue.gender === "FEMALE"}
              onChange={genderSelectHandler}
            />
            <SGenderSelector htmlFor="female_btn">
              <SAbove style={{ marginBottom: "15px" }}>
                <img src={checkImg} alt="check" />
                <span>여성</span>
              </SAbove>
              <img
                src={femaleImg}
                alt="female"
                style={{
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              />
            </SGenderSelector>
            <SRadioInput
              id="male_btn"
              type="radio"
              value="MALE"
              checked={preferenceValue.gender === "MALE"}
              onChange={genderSelectHandler}
            />
            <SGenderSelector htmlFor="male_btn">
              <SAbove>
                <img src={checkImg} alt="check" />
                <span>남성</span>
              </SAbove>
              <img
                src={maleImg}
                alt="male"
                style={{
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              />
            </SGenderSelector>
          </SQuestion>

          {/* 연령대 */}
          <SQuestion>
            <SRadioInput
              id="20_btn"
              type="radio"
              value="20"
              checked={preferenceValue.age === "20"}
              onChange={ageSelectHandler}
            />
            <SAgeSelector htmlFor="20_btn">20대</SAgeSelector>
            <SRadioInput
              id="30_btn"
              type="radio"
              value="30"
              checked={preferenceValue.age === "30"}
              onChange={ageSelectHandler}
            />
            <SAgeSelector htmlFor="30_btn">30대</SAgeSelector>
            <SRadioInput
              id="40_btn"
              type="radio"
              value="40"
              checked={preferenceValue.age === "40"}
              onChange={ageSelectHandler}
            />
            <SAgeSelector htmlFor="40_btn">40대</SAgeSelector>
            <SRadioInput
              id="50_btn"
              type="radio"
              value="50"
              checked={preferenceValue.age === "50"}
              onChange={ageSelectHandler}
            />
            <SAgeSelector htmlFor="50_btn">50대 이상</SAgeSelector>
          </SQuestion>
        </SCentered>
        <SNavigate onClick={nextPageHandler}>
          <img src={navigateImg} alt="navigate" />
        </SNavigate>
      </SDiv>
    </motion.div>
  );
};

export default QuestionFilter;

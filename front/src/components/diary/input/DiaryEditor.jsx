import React, { useState, useEffect } from "react";

//import component
import DiaryNewContent from "./DiaryNewContent";

//import css
import styled from "styled-components";

//import images
import good from "../../../assets/img/good.png";
import soso from "../../../assets/img/soso.png";
import sad from "../../../assets/img/sad.png";
import littledrink from "../../../assets/img/littledrink.png";
import normaldrink from "../../../assets/img/normaldrink.png";
import largedrink from "../../../assets/img/largedrink.png";

const SP = styled.p`
  font-size: 23px;
  font-weight: bold;
`;

const SButton = styled.button`
  border: 2px solid #f84f5a;
  border-radius: 12px;
  background: #f84f5a;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  width: 65px;
  height: 35px;
`;

const SInput = styled.input`
  border: none;
  border-bottom: 2px solid #949494;
  margin-left: 20px;
  width: 320px;
  height: 35px;
`;

const SHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 30px;
`;

const SMainDiv = styled.div`
  padding: 0px 25px;
`;

const STextarea = styled.textarea`
  border: 2px solid #adadad;
  background: #fcfcfc;
  border-radius: 8px;
  margin-left: 20px;
  padding: 20px;
  width: 350px;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
`;

const SRangeInput = styled.input`
  margin-left: 20px;
  -webkit-appearance: none;
  border : 1px solid #F84F5A;
  background : #F84F5A;
  height : 1px;
  width : 320px;

  ::-webkit-slider-thumb {
    -webkit-appearance : none;
    cursor : pointer;
    border: 2px solid #F84F5A;
    background : #F84F5A;
    height: calc(1.2em / 0.7); 
    width: calc(1.2em / 0.7);
    border-radius: 50%;
  }
  }
`;

const SRangeP = styled.p`
  font-size: 16px;
  margin-left: 20px;
`;

const DiaryEditor = ({ onCreate, today, currentComponent, setCurrentComponent }) => {
  const [emotionImage, setEmotionImage] = useState(soso);
  const [drinkImage, setDrinkImage] = useState(normaldrink);

  const [drinklevelValue, setDrinklevelValue] = useState(0);
  const [emotionValue, setEmotionValue] = useState(100);

  const [emotion, setEmotion] = useState("최고예요");
  const [drinklevel, setDrinklevel] = useState("소량");

  useEffect(() => {
    setEmotionValue(50);
    setDrinklevelValue(50);
    setEmotion("그냥그래요");
    setDrinklevel("적당히");
  }, [currentComponent]);

  const handleEmotionChange = (e) => {
    const emotionValue = e.target.value;
    setEmotionValue(emotionValue);
    if (emotionValue <= 33) {
      setEmotion("별로예요");
      setEmotionImage(sad);
    } else if (emotionValue <= 66) {
      setEmotion("그냥그래요");
      setEmotionImage(soso);
    } else {
      setEmotion("최고예요");
      setEmotionImage(good);
    }
  };

  const handleDrinklevelChange = (e) => {
    const drinklevelValue = e.target.value;
    setDrinklevelValue(drinklevelValue);
    if (drinklevelValue <= 33) {
      setDrinklevel("소량");
      setDrinkImage(littledrink);
    } else if (drinklevelValue <= 66) {
      setDrinklevel("적당히");
      setDrinkImage(normaldrink);
    } else {
      setDrinklevel("만취");
      setDrinkImage(largedrink);
    }
  };

  const [state, setState] = useState({
    whisky: "",
    drinklevel: "",
    emotion: "",
    content: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onCreate(state.whisky, drinklevelValue, emotionValue, state.content);
    alert("등록 완료");
    setState({
      whisky: "",
      drinklevel: "",
      emotion: "",
      content: "",
    });
    setCurrentComponent("diaryNewContent");
  };

  return (
    <>
      {currentComponent === "diaryEditor" ? (
        <div>
          <SHeaderDiv>
            <SP
              style={{
                fontSize: "30px",
                marginTop: "0px",
                marginBottom: "0px",
                color: "#F84F5A",
                flex: "1",
              }}
            >
              {today}
            </SP>
            <SButton sytle={{ flex: "1" }} onClick={handleSubmit}>
              저장
            </SButton>
          </SHeaderDiv>
          <SMainDiv>
            <div>
              <SP>오늘의 위스키</SP>
              <SInput
                value={state.whisky}
                onChange={handleChangeState}
                name="whisky"
                placeholder="위스키 이름을 입력해주세요"
                type="text"
              />
            </div>
            <div>
              <SP>오늘의 주량</SP>
              <div>
                <SRangeP>
                  {drinklevel}
                  <img src={drinkImage} alt={""} />
                </SRangeP>
                <SRangeInput
                  type="range"
                  name="drinklevel"
                  min="0"
                  max="100"
                  step="50"
                  onChange={handleDrinklevelChange}
                />
              </div>
            </div>
            <div>
              <SP>오늘의 기분</SP>
              <div>
                <SRangeP>
                  {emotion} <img src={emotionImage} alt={""} />
                </SRangeP>
                <SRangeInput
                  type="range"
                  name="emotion"
                  min="0"
                  max="100"
                  step="50"
                  onChange={handleEmotionChange}
                />
              </div>
            </div>
            <div>
              <SP>오늘의 한마디</SP>
              <STextarea
                value={state.content}
                onChange={handleChangeState}
                name="content"
                type="text"
              />
            </div>
          </SMainDiv>
        </div>
      ) : (
        <DiaryNewContent />
      )}
    </>
  );
};

export default DiaryEditor;

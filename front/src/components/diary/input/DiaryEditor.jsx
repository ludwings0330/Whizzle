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
import { example } from "../../../apis/userinfo";

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
  border: 1px solid #f84f5a;
  background: linear-gradient(to right, #f84f5a, #f84f5a) no-repeat;
  background-size: ${(props) => (props.value / props.max) * 100}% 100%;
  height: 1px;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    width: 25px;
    height: 25px;
    background-color: #ffffff;
    border: 2px solid #f84f5a;
    border-radius: 50%;
    box-shadow: 0 0 0 8px rgba(248, 79, 90, 0.2);
    transition: box-shadow 0.2s ease-in-out;
  }

  &::-webkit-slider-runnable-track {
    background-color: transparent;
  }

  &:hover::-webkit-slider-thumb {
    box-shadow: 0 0 0 8px rgba(248, 79, 90, 0.2);
  }

  &:hover::-webkit-slider-runnable-track {
    background: rgba(248, 79, 90, 0.2);
  }

  position: relative;

  &::before {
    position: absolute;
    bottom: 120%;
    left: ${(props) => (props.value / props.max) * 100}%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #000;
    background-color: #fff;
    border-radius: 3px;
    padding: 3px 6px;
    white-space: nowrap;
    display: none;
  }

  &:hover::before {
    display: block;
  }
`;

const SRangeDiv = styled.div`
  font-size: 16px;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 0;
  position: absolute;
  display: flex;
  top: -80px;
  left: ${(props) => (props.value / props.max) * 100}%;
`;

const SRangeContainer = styled.div`
  position: relative;
  margin-top: 80px;
`;

const STextP = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const SImg = styled.img`
  width: 40px;
  height: 40px;
`;

const DiaryEditor = ({ onCreate, today, currentComponent, setCurrentComponent }) => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태값
  const [searchTerms, setSearchTerms] = useState([]); // 검색어 배열 상태값

  // 검색어 입력 이벤트 처리 함수
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색어 추가 이벤트 처리 함수
  const handleInputEnter = (event) => {
    if (event.key === "Enter" && searchTerm !== "") {
      setSearchTerms([...searchTerms, searchTerm]);
      setSearchTerm("");
    }
  };

  // 검색어 삭제 이벤트 처리 함수
  const handleTagDelete = (tag) => {
    setSearchTerms(searchTerms.filter((t) => t !== tag));
  };

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
    setSearchTerms([]);
  }, [currentComponent]);

  const handleEmotionChange = (e) => {
    const emotionValue = e.target.value;
    setEmotionValue(emotionValue);
    if (emotionValue <= 33) {
      setEmotion("별로");
      setEmotionImage(sad);
    } else if (emotionValue <= 66) {
      setEmotion("NORMAL");
      setEmotionImage(soso);
    } else {
      setEmotion("GOOD");
      setEmotionImage(good);
    }
    console.log(emotionValue);
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
    onCreate(state.whisky, drinklevelValue, emotionValue, state.content, searchTerms);
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
                value={searchTerm}
                onChange={handleInputChange}
                name="whisky"
                onKeyPress={handleInputEnter}
                placeholder="위스키 이름을 입력해주세요"
                type="text"
              />
              <div>
                {searchTerms.map((tag, index) => (
                  <div key={index}>
                    <span>{tag}</span>
                    <button onClick={() => handleTagDelete(tag)}>x</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SP>오늘의 주량</SP>
              <SRangeContainer>
                <SRangeDiv>
                  <STextP>{drinklevel}</STextP>
                  <SImg src={drinkImage} alt={""} />
                </SRangeDiv>
                <SRangeInput
                  type="range"
                  name="drinklevel"
                  min="0"
                  max="100"
                  step="50"
                  onChange={handleDrinklevelChange}
                />
              </SRangeContainer>
            </div>
            <div>
              <SP>오늘의 기분</SP>
              <SRangeContainer>
                <SRangeDiv>
                  <STextP>{emotion}</STextP>
                  <SImg src={emotionImage} alt={""} />
                </SRangeDiv>
                <SRangeInput
                  type="range"
                  name="emotion"
                  min="0"
                  max="100"
                  step="50"
                  onChange={handleEmotionChange}
                />
              </SRangeContainer>
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

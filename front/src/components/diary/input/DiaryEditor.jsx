import React, { useState } from "react";

//import css
import styled from "styled-components";

const SP = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const SButton = styled.button`
  border: 2px solid #f84f5a;
  border-radius: 12px;
  background: #f84f5a;
  color: white;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  width: 60px;
  height: 31px;
`;

const SInput = styled.input`
  border: none;
  border-bottom: 2px solid #949494;
  margin-left: 20px;
  width: 310px;
  height: 30px;
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
  padding: 10px;
  width: 316px;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
`;

const SRangeInput = styled.input`
  margin-left: 20px;
`;

const DiaryEditor = ({ onCreate, today }) => {
  const [mood, setMood] = useState("최고예요");
  const [alcohol, setAlcohol] = useState("소량");

  const handleMoodChange = (e) => {
    const value = e.target.value;
    if (value <= 33) {
      setMood("별로예요");
    } else if (value <= 66) {
      setMood("그냥그래요");
    } else {
      setMood("최고예요");
    }
  };

  const handleAlcoholChange = (e) => {
    const value = e.target.value;
    if (value <= 33) {
      setAlcohol("소량");
    } else if (value <= 66) {
      setAlcohol("적당히");
    } else {
      setAlcohol("만취");
    }
  };

  const [state, setState] = useState({
    title: "",
    alcohol: "",
    condition: "",
    content: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onCreate(state.title, state.alcohol, state.condition, state.content);
    alert("등록 완료");
    setState({
      title: "",
      alcohol: "",
      condition: "",
      content: "",
    });
  };

  return (
    <>
      <SHeaderDiv>
        <SP
          style={{
            fontSize: "25px",
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
            value={state.title}
            onChange={handleChangeState}
            name="title"
            placeholder="위스키 이름을 입력해주세요"
            type="text"
          />
        </div>
        <div>
          <SP>오늘의 주량</SP>
          <div>
            <SRangeInput type="range" min="0" max="100" step="1" onChange={handleAlcoholChange} />
            <p>오늘의 주량: {alcohol}</p>
          </div>
        </div>
        <div>
          <SP>오늘의 기분</SP>
          <div>
            <SRangeInput type="range" min="0" max="100" step="1" onChange={handleMoodChange} />
            <p>오늘의 기분: {mood}</p>
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
    </>
  );
};

export default DiaryEditor;

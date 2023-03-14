import React, { useState } from "react";

const DiaryEditor = ({ onCreate, today }) => {
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
  };

  return (
    <>
      <div>
        <button onClick={handleSubmit}>저장</button>
      </div>
      <div>
        <h2>{today}</h2>
      </div>
      <div>
        <h2>오늘의 위스키</h2>
        <input
          value={state.title}
          onChange={handleChangeState}
          name="title"
          placeholder="위스키 이름을 입력해주세요"
          type="text"
        />
      </div>
      <div>
        <h2>오늘의 주량</h2>
        <h2>---range bar 자리---</h2>
      </div>
      <div>
        <h2>오늘의 기분</h2>
        <h2>---range bar 자리---</h2>
      </div>
      <div>
        <h2>오늘의 한마디</h2>
        <textarea value={state.content} onChange={handleChangeState} name="content" type="text" />
      </div>
    </>
  );
};

export default DiaryEditor;

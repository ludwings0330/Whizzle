import { React, useState } from "react";
import styled from "styled-components";

const SLayout = styled.div``;

//다이어리 입력 박스
const DiaryInputBox = ({ onCreate }) => {
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onCreate(state.content);
    alert("저장 성공");

    setState({
      title: "",
      content: "",
    });
  };

  return (
    <>
      <SLayout>
        <h1>다이어리 입력 박스</h1>
        <div>
          <h1>날짜</h1>
        </div>
        <div>
          <h1>오늘의 위스키</h1>
          <input name="title" value={state.title} onChange={handleChangeState} />
        </div>
        <div>
          <h1>오늘의 주량</h1>
        </div>
        <div>
          <h1>오늘의 기분</h1>
        </div>
        <div>
          <h1>오늘의 한마디</h1>
          <textarea name="content" value={state.content} onChange={handleChangeState} />
        </div>

        <div>
          <button onClick={handleSubmit}>저장</button>
        </div>
      </SLayout>
    </>
  );
};

export default DiaryInputBox;

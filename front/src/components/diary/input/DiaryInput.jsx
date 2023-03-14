//import react
import React, { useState } from "react";

//import component
import DiaryEditor from "./DiaryEditor";
import DiaryNewContent from "./DiaryNewContent";

//import css
import styled from "styled-components";

const SDiv = styled.div`
  border: 1px solid gray;
  text-align: center;
  padding: 20px;
`;

//input 최상단 component
const DiaryInput = () => {
  const [data, setData] = useState([]);

  const today = new Date().toLocaleDateString();

  //위스키 이름, 주량, 기분, 한마디
  const onCreate = (title, alcohol, condition, content) => {
    const newItem = {
      title,
      alcohol,
      condition,
      content,
    };
    setData([newItem, ...data]);
  };

  const onRemove = (today) => {
    const newDiaryContent = data.filter((it) => it.today !== today);
    setData(newDiaryContent);
  };

  const onEdit = (today, newContent) => {
    setData(data.map((it) => (it.today === today ? { ...it, content: newContent } : it)));
  };

  return (
    <>
      <SDiv>
        <DiaryEditor onCreate={onCreate} today={today} />
        <DiaryNewContent onEdit={onEdit} onRemove={onRemove} diaryContent={data} today={today} />
      </SDiv>
    </>
  );
};

export default DiaryInput;

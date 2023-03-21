import React, { useState } from "react";

//import component
import DiaryEditor from "./DiaryEditor";
import DiaryNewContent from "./DiaryNewContent";

//import css
import styled from "styled-components";

const SDiv = styled.div`
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  display: inline-block;
  width: 460px;
  height: 650px;
  margin: 0 10px;
  text-align: left;
  padding: 40px 60px 40px 40px;
  box-shadow: 5px 5px 5px #e1e1e1;
`;

//input 최상단 component
const DiaryInput = ({ selectedDate }) => {
  const [data, setData] = useState([]);
  const [currentComponent, setCurrentComponent] = useState("diaryEditor");

  const today = selectedDate;

  //위스키 이름, 주량, 기분, 한마디
  const onCreate = (whisky, drinklevel, emotion, content) => {
    const newItem = {
      whisky,
      drinklevel,
      emotion,
      content,
      id: today,
    };
    setData([newItem, ...data]);
  };

  const onRemove = (today) => {
    const newDiaryContent = data.filter((it) => it.today === today);
    setData(newDiaryContent);
    setCurrentComponent("diaryEditor");
  };

  const onEdit = (today, newContent) => {
    setData(data.map((it) => (it.today === today ? { ...it, content: newContent } : it)));
  };

  return (
    <>
      <SDiv>
        <DiaryEditor
          onCreate={onCreate}
          today={today}
          currentComponent={currentComponent}
          setCurrentComponent={setCurrentComponent}
        />
        <DiaryNewContent onEdit={onEdit} onRemove={onRemove} diaryContent={data} today={today} />
      </SDiv>
    </>
  );
};

export default DiaryInput;

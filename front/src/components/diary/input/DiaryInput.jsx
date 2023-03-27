import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { diaryState, dataState, currentComponentState } from "../../../store/indexStore";

//import component
import DiaryEditor from "./DiaryEditor";
import DiaryNewContent from "./DiaryNewContent";

//import css
import styled from "styled-components";
import DiaryItem from "./DiaryItem";

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
  const [currentComponent, setCurrentComponent] = useRecoilState(currentComponentState);
  const [data, setData] = useRecoilState(dataState);

  const today = new Date(selectedDate)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", ".")
    .replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$1-$2-$3".replace(/-(\d{1})-/, "-0$1-"));

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
          today={today}
          currentComponent={currentComponent}
          setCurrentComponent={setCurrentComponent}
        />
        {data.drinkLevel && <DiaryItem onEdit={onEdit} onRemove={onRemove} today={today} />}
      </SDiv>
    </>
  );
};

export default DiaryInput;

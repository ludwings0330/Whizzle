import React from "react";
import DiaryItem from "./DiaryItem";

//임시로 저장할 리스트 컴포넌트
const DiaryList = ({ onDelete, diaryList }) => {
  return (
    <>
      <div>
        {diaryList.map((it) => (
          <DiaryItem {...it} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
};

export default DiaryList;

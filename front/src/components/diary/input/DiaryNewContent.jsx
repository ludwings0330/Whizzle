import React from "react";
import DiaryItem from "./DiaryItem";

const DiaryNewContent = ({ onEdit, onRemove, diaryContent, today }) => {
  return (
    <>
      <div>
        {diaryContent.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} today={today} />
        ))}
      </div>
    </>
  );
};

export default DiaryNewContent;

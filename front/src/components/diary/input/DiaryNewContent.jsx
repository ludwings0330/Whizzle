import React from "react";
import DiaryItem from "./DiaryItem";

const DiaryNewContent = ({ onEdit, onRemove, diaryContent, today }) => {
  if (!diaryContent) {
    return null;
  }

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

DiaryNewContent.defaultProps = {
  diaryContent: [],
};

export default DiaryNewContent;

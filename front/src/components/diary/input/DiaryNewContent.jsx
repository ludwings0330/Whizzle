import React from "react";
import DiaryItem from "./DiaryItem";

const DiaryNewContent = ({ onEdit, onRemove, diaryContent, today }) => {
  if (!diaryContent) {
    return null;
  }

  return (
    <>
      <div>
        <DiaryItem onEdit={onEdit} onRemove={onRemove} today={today} />
      </div>
    </>
  );
};

DiaryNewContent.defaultProps = {
  diaryContent: "",
};

export default DiaryNewContent;

import React, { useState } from "react";

const DiaryItem = ({ onRemove, onEdit, today, title, alcohol, condition, content }) => {
  const [localContent, setLocalContent] = useState(content);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleClickRemove = () => {
    if (window.confirm(`${today}날의 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(today);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (window.confirm(`${today} 날의 일기를 수정하시겠습니까?`)) {
      onEdit(today, localContent);
      toggleIsEdit();
    }
  };

  return (
    <>
      <div>{today}</div>
      <div>
        <h2>오늘의 위스키</h2>
        {title}
      </div>
      <div>
        <h2>오늘의 주량</h2>
      </div>
      <div>
        <h2>오늘의 기분</h2>
      </div>
      <div>
        <h2>오늘의 한마디</h2>
        {isEdit ? (
          <textarea value={localContent} onChange={(e) => setLocalContent(e.target.value)} />
        ) : (
          content
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleClickRemove}>삭제</button>
          <button onClick={toggleIsEdit}>수정</button>
        </>
      )}
    </>
  );
};

export default DiaryItem;

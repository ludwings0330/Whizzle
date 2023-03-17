import React, { useState } from "react";

//import css
import styled from "styled-components";

const SButton = styled.button`
  border: 2px solid #f84f5a;
  border-radius: 12px;
  background: #f84f5a;
  color: white;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  width: 60px;
  height: 31px;
`;

const DiaryItem = ({ onRemove, onEdit, today, title, alcohol, condition, content }) => {
  const [localContent, setLocalContent] = useState(content);
  const [localTitle, setLocalTitle] = useState(title);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleClickRemove = () => {
    if (window.confirm(`${today}날의 일기를 정말 삭제하시겠습니까?`)) {
      toggleIsEdit();
      onRemove(today);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalTitle(title);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (window.confirm(`${today} 날의 일기를 수정하시겠습니까?`)) {
      onEdit(today, localTitle);
      onEdit(today, localContent);
      toggleIsEdit();
    }
  };

  return (
    <>
      <div>{today}</div>
      <div>
        <h2>오늘의 위스키</h2>
        {isEdit ? (
          <input value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} />
        ) : (
          content
        )}
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
          <SButton onClick={handleQuitEdit}>수정취소</SButton>
          <SButton onClick={handleEdit}>수정완료</SButton>
        </>
      ) : (
        <>
          <SButton onClick={handleClickRemove}>삭제</SButton>
          <SButton onClick={toggleIsEdit}>수정</SButton>
        </>
      )}
    </>
  );
};

export default DiaryItem;

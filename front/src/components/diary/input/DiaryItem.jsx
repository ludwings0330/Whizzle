import React, { useState } from "react";

//import css
import styled from "styled-components";

const SP = styled.p`
  font-size: 23px;
  font-weight: bold;
`;

const SHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 30px;
`;

const SMainDiv = styled.div`
  padding: 0px 25px;
`;

const SButton = styled.button`
  border: 2px solid #f84f5a;
  border-radius: 12px;
  background: #f84f5a;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  width: 65px;
  height: 35px;
  margin-left: 8px;
`;

const SInput = styled.input`
  border: none;
  border-bottom: 2px solid #949494;
  margin-left: 20px;
  width: 320px;
  height: 35px;
`;

const STextarea = styled.textarea`
  border: 2px solid #adadad;
  background: #fcfcfc;
  border-radius: 8px;
  margin-left: 20px;
  padding: 25px;
  width: 350px;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
`;

const SRangeInput = styled.input`
  margin-left: 20px;
`;

const DiaryItem = ({ onRemove, onEdit, today, whisky, drinklevel, emotion, content }) => {
  const [localContent, setLocalContent] = useState(content);
  const [localWhisky, setLocalWhisky] = useState(whisky);
  const [localDrinklevel, setLocalDrinklevel] = useState(drinklevel);
  const [localEmotion, setLocalEmotion] = useState(emotion);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleClickRemove = () => {
    if (window.confirm(`${today}날의 일기를 정말 삭제하시겠습니까?`)) {
      toggleIsEdit();
      onRemove(today);
      setLocalWhisky("");
      setLocalDrinklevel(0);
      setLocalEmotion(0);
      setLocalContent("");
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalWhisky(localWhisky);
    setLocalContent(localContent);
    setLocalDrinklevel(localDrinklevel);
    setLocalEmotion(localEmotion);
  };

  const handleEdit = () => {
    if (window.confirm(`${today} 날의 일기를 수정하시겠습니까?`)) {
      onEdit(today, localWhisky);
      onEdit(today, localContent);
      onEdit(today, localDrinklevel);
      onEdit(today, localEmotion);
      toggleIsEdit();
    }
  };

  return (
    <>
      <SHeaderDiv>
        <SP
          style={{
            fontSize: "30px",
            marginTop: "0px",
            marginBottom: "0px",
            color: "#F84F5A",
            flex: "1",
          }}
        >
          {today}
        </SP>

        {isEdit ? (
          <>
            <SButton onClick={handleQuitEdit}>수정취소</SButton>
            <SButton onClick={handleEdit}>수정완료</SButton>
          </>
        ) : (
          <>
            <SButton onClick={toggleIsEdit}>수정</SButton>
            <SButton onClick={handleClickRemove}>삭제</SButton>
          </>
        )}
      </SHeaderDiv>
      <SMainDiv>
        <div>
          <SP>오늘의 위스키</SP>
          {isEdit ? (
            <SInput value={localWhisky} onChange={(e) => setLocalWhisky(e.target.value)} />
          ) : (
            localWhisky
          )}
        </div>
        <div>
          <SP>오늘의 주량</SP>
          {drinklevel ? (
            <SRangeInput
              type="range"
              min="0"
              max="100"
              step="1"
              value={localDrinklevel}
              onChange={(e) => setLocalDrinklevel(e.target.value)}
            />
          ) : (
            localDrinklevel
          )}
        </div>
        <div>
          <SP>오늘의 기분</SP>
          {emotion ? (
            <SRangeInput
              type="range"
              min="0"
              max="100"
              step="1"
              value={localEmotion}
              onChange={(e) => setLocalEmotion(e.target.value)}
            />
          ) : (
            localEmotion
          )}
        </div>
        <div>
          <SP>오늘의 한마디</SP>
          {isEdit ? (
            <STextarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              type="text"
            />
          ) : (
            localContent
          )}
        </div>
      </SMainDiv>
    </>
  );
};

export default DiaryItem;

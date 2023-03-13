import React, { useState } from "react";
import DiaryInputBox from "./DiaryInputBox";
import DiaryList from "./DiaryList";

//다이어리 input의 최상단 컴포넌트
const DiaryInput = () => {
  const [data, setData] = useState([]);

  const onCreate = (title, alcohol, condition, content) => {
    const newItem = {
      title,
      alcohol,
      condition,
      content,
    };

    setData([newItem]);
  };

  const onDelete = () => {
    setData([]);
  };

  return (
    <>
      <DiaryInputBox onCreate={onCreate} />
      <DiaryList DiaryList={data} onDelete={onDelete} />
    </>
  );
};

export default DiaryInput;

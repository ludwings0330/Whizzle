import React, { useState, useEffect } from "react";

//import css
import styled from "styled-components";

//import images
import good from "../../../assets/img/good.png";
import soso from "../../../assets/img/soso.png";
import sad from "../../../assets/img/sad.png";
import littledrink from "../../../assets/img/littledrink.png";
import normaldrink from "../../../assets/img/normaldrink.png";
import largedrink from "../../../assets/img/largedrink.png";

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

const SUpdateButton = styled.button`
  border: 2px solid #f84f5a;
  border-radius: 12px;
  background: #f84f5a;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  width: 85px;
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
  padding: 20px;
  width: 350px;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
`;

const SRangeInput = styled.input`
  margin-left: 20px;
  -webkit-appearance: none;
  border: 1px solid #f84f5a;
  background: linear-gradient(to right, #f84f5a, #f84f5a) no-repeat;
  background-size: ${(props) => (props.value / props.max) * 100}% 100%;
  height: 1px;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    width: 25px;
    height: 25px;
    background-color: #ffffff;
    border: 2px solid #f84f5a;
    border-radius: 50%;
    box-shadow: 0 0 0 8px rgba(248, 79, 90, 0.2);
    transition: box-shadow 0.2s ease-in-out;
  }

  &::-webkit-slider-runnable-track {
    background-color: transparent;
  }

  &:hover::-webkit-slider-thumb {
    box-shadow: 0 0 0 8px rgba(248, 79, 90, 0.2);
  }

  &:hover::-webkit-slider-runnable-track {
    background: rgba(248, 79, 90, 0.2);
  }

  position: relative;

  &::before {
    position: absolute;
    bottom: 120%;
    left: ${(props) => (props.value / props.max) * 100}%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #000;
    background-color: #fff;
    border-radius: 3px;
    padding: 3px 6px;
    white-space: nowrap;
    display: none;
  }

  &:hover::before {
    display: block;
  }
`;

const SRangeDiv = styled.div`
  font-size: 16px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 0;
  position: absolute;
  display: flex;
  top: -80px;
  left: ${(props) => (props.value / props.max) * 100}%;
`;

const SRangeContainer = styled.div`
  position: relative;
  margin-top: 80px;
`;

const STextP = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const SImg = styled.img`
  width: 40px;
  height: 40px;
`;

const DiaryItem = ({
  onRemove,
  onEdit,
  today,
  whisky,
  drinklevel,
  emotion,
  content,
  searchTerms,
}) => {
  const [localContent, setLocalContent] = useState(content);
  const [localWhisky, setLocalWhisky] = useState(whisky);
  const [localDrinklevel, setLocalDrinklevel] = useState(drinklevel);
  const [localEmotion, setLocalEmotion] = useState(emotion);

  const [drinkImage, setDrinkImage] = useState(littledrink);
  const [drinkValue, setDrinkValue] = useState("");
  const [emotionImage, setEmotionImage] = useState(soso);
  const [emotionValue, setEmotionValue] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [localSearchTerms, setLocalSearchTerms] = useState(searchTerms);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleClickRemove = () => {
    if (window.confirm(`${today}날의 일기를 정말 삭제하시겠습니까?`)) {
      toggleIsEdit();
      onRemove(today);
      return;
    }
  };

  useEffect(() => {
    if (localDrinklevel <= 33) {
      setDrinkImage(littledrink);
      setDrinkValue("소량");
    } else if (localDrinklevel <= 66) {
      setDrinkImage(normaldrink);
      setDrinkValue("적당히");
    } else {
      setDrinkImage(largedrink);
      setDrinkValue("만취");
    }
    if (localEmotion <= 33) {
      setEmotionImage(sad);
      setEmotionValue("별로예요");
    } else if (localEmotion <= 66) {
      setEmotionImage(soso);
      setEmotionValue("그냥그래요");
    } else {
      setEmotionImage(good);
      setEmotionValue("최고예요");
    }
  }, [localDrinklevel, localEmotion]);

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
      onEdit(today, localSearchTerms);

      toggleIsEdit();
    }
  };
  const handleTagDelete = (tag) => {
    setLocalSearchTerms(localSearchTerms.filter((t) => t !== tag));
  };
  const handleInputEnter = (event) => {
    if (event.key === "Enter" && localWhisky !== "") {
      setLocalSearchTerms([...localSearchTerms, localWhisky]);
      setLocalWhisky("");
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
            <SUpdateButton onClick={handleQuitEdit}>수정취소</SUpdateButton>
            <SUpdateButton onClick={handleEdit}>수정완료</SUpdateButton>
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
            <>
              <SInput
                value={localWhisky}
                type="text"
                onChange={(e) => setLocalWhisky(e.target.value)}
                onKeyPress={handleInputEnter}
              />
              <div>
                {localSearchTerms.map((tag, index) => (
                  <div key={index}>
                    <span>{tag}</span>
                    <button onClick={() => handleTagDelete(tag)}>x</button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              {localSearchTerms.map((tag, index) => (
                <div key={index}>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <SP>오늘의 주량</SP>
          <SRangeContainer>
            {drinklevel ? (
              <div>
                <SRangeDiv>
                  <STextP>{drinkValue}</STextP>
                  <SImg src={drinkImage} alt={""} />
                </SRangeDiv>
                <SRangeInput
                  type="range"
                  min="0"
                  max="100"
                  step="50"
                  value={localDrinklevel}
                  onChange={(e) => setLocalDrinklevel(e.target.value)}
                  disabled={!isEdit}
                />
              </div>
            ) : (
              localDrinklevel
            )}
          </SRangeContainer>
        </div>
        <div>
          <SP>오늘의 기분</SP>
          <SRangeContainer>
            {emotion ? (
              <div>
                <SRangeDiv>
                  <STextP>{emotionValue}</STextP>
                  <SImg src={emotionImage} alt={""} />
                </SRangeDiv>
                <SRangeInput
                  type="range"
                  min="0"
                  max="100"
                  step="50"
                  value={localEmotion}
                  onChange={(e) => setLocalEmotion(e.target.value)}
                  disabled={!isEdit}
                />
              </div>
            ) : (
              localEmotion
            )}
          </SRangeContainer>
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
            <STextarea value={localContent} disabled={!isEdit} />
          )}
        </div>
      </SMainDiv>
    </>
  );
};

export default DiaryItem;

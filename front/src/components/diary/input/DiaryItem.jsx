import React, { useState, useEffect } from "react";
import { diaryUpdate, diaryDelete } from "../../../apis/diary";
import {
  diaryState,
  diaryDataState,
  fetchDiaries,
  currentComponentState,
} from "../../../store/indexStore";
import { useRecoilState, useSetRecoilState } from "recoil";

//import css
import styled from "styled-components";

//import images
import good from "../../../assets/img/good.png";
import soso from "../../../assets/img/soso.png";
import sad from "../../../assets/img/sad.png";
import littledrink from "../../../assets/img/littledrink.png";
import normaldrink from "../../../assets/img/normaldrink.png";
import largedrink from "../../../assets/img/largedrink.png";

const SBorderDiv = styled.div`
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

const SP = styled.p`
  font-size: 23px;
  font-weight: bold;
`;
const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  gap: 4px;
  margin-right: 10px;
  height: 20px;

  background: #f84f5a;
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

const DiaryItem = ({ selectedDate }) => {
  console.log("잘 들어옴?");
  const setCurrentComponentState = useSetRecoilState(currentComponentState);
  const [data, setData] = useRecoilState(diaryDataState);

  const [diaryList, setDiaryList] = useRecoilState(diaryState);
  const [localContent, setLocalContent] = useState(data.content);
  const [localWhisky, setLocalWhisky] = useState(data.whisky);
  const [localDrinklevel, setLocalDrinklevel] = useState(data.drinkLevel);
  const [localEmotion, setLocalEmotion] = useState(data.emotion);

  const [drinkImage, setDrinkImage] = useState(littledrink);
  const [drinkValue, setDrinkValue] = useState("");
  const [emotionImage, setEmotionImage] = useState(soso);
  const [emotionValue, setEmotionValue] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [localSearchTerms, setLocalSearchTerms] = useState(
    data.drinks.map((drink) => drink.whisky.id)
  );

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const initData = () => {
    const newDrinkLevel = data.drinkLevel === "LIGHT" ? 0 : data.drinkLevel === "HEAVY" ? 100 : 50;
    const newEmotion = data.emotion === "BAD" ? 0 : data.emotion === "GOOD" ? 100 : 50;
    setLocalWhisky("");
    setLocalContent(data.content);
    setLocalDrinklevel(newDrinkLevel);
    setLocalEmotion(newEmotion);
    setLocalSearchTerms(data.drinks.map((drink) => drink.whisky.id));
  };

  const today = new Date(selectedDate);
  const year = today.getFullYear().toString().padStart(4, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}.${month.padStart(2, "0")}.${day.padStart(2, "0")}`;

  useEffect(() => {
    initData();
  }, [data]);

  const handleClickRemove = async () => {
    if (window.confirm(`${today}날의 일기를 정말 삭제하시겠습니까?`)) {
      toggleIsEdit();
      diaryDelete(data.id);

      // If not in edit mode, render diary editor
      if (!isEdit) {
        setData({
          id: 0,
          date: "",
          emotion: "",
          drinkLevel: "",
          content: "",
          drinks: [
            {
              whisky: {
                id: 0,
                name: "",
              },
              drinkOrder: 0,
            },
          ],
        });
        setCurrentComponentState("diaryEditor");
      } else {
        // If in edit mode, render diary item
        await fetchDiaries(setDiaryList, setData, today);
        setCurrentComponentState("diaryItem");
      }
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
    console.log("오류뜨니");

    setIsEdit(false);
    initData();
  };

  const handleEdit = async () => {
    if (window.confirm(`${today} 날의 일기를 수정하시겠습니까?`)) {
      const changeEmotionApi = localEmotion === 0 ? "BAD" : localEmotion === 50 ? "NORMAL" : "GOOD";
      const changeDrinkLevelApi =
        localDrinklevel === 0 ? "LIGHT" : localDrinklevel === 50 ? "MODERATE" : "HEAVY";

      const deletedDrinkOrders = [];
      const insertedWhiskyIds = [];

      // data.drinks 기준으로 삭제된 drinkOrder 번호 찾기
      data.drinks.forEach((drink) => {
        if (!localSearchTerms.includes(drink.whisky.id)) {
          deletedDrinkOrders.push(drink.drinkOrder);
        }
      });

      // localSearchTerms 기준으로 추가된 whisky id 찾기
      localSearchTerms.forEach((whiskyId) => {
        const found = data.drinks.find((drink) => drink.whisky.id === whiskyId);
        if (!found) {
          insertedWhiskyIds.push(whiskyId);
        }
      });
      console.log(insertedWhiskyIds);
      console.log(deletedDrinkOrders);
      const editItem = {
        id: data.id,
        emotion: changeEmotionApi,
        drinkLevel: changeDrinkLevelApi,
        content: localContent,
        insertedWhiskyIds: insertedWhiskyIds.map(Number),
        deletedDrinkOrders,
      };
      console.log(editItem);
      await diaryUpdate(editItem);
      await fetchDiaries(setDiaryList, setData, data.date);
      toggleIsEdit();
    }
  };

  const handleInputEnter = (event) => {
    if (event.key === "Enter" && localWhisky !== "") {
      setLocalSearchTerms([...localSearchTerms, localWhisky]);
      setLocalWhisky("");
    }
  };

  const deleteRecentSearchWord = (word) => {
    let updatedRecentSearch = [...localSearchTerms];
    const existingIndex = updatedRecentSearch.indexOf(word);
    if (existingIndex !== -1) {
      updatedRecentSearch.splice(existingIndex, 1);
      setLocalSearchTerms(updatedRecentSearch);
    }
  };

  return (
    <>
      <SBorderDiv>
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
            {formattedDate}
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
                  <div>
                    {localSearchTerms.map((word, index) => (
                      <SDiv key={index}>
                        <SP>{word.length > 6 ? `${word.slice(0, 6)}...` : word}</SP>
                        <SButton onClick={() => deleteRecentSearchWord(word)}>X</SButton>
                      </SDiv>
                    ))}
                  </div>
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
            </SRangeContainer>
          </div>
          <div>
            <SP>오늘의 기분</SP>
            <SRangeContainer>
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
            </SRangeContainer>
          </div>
          <div>
            <SP>오늘의 한마디</SP>
            <STextarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              type="text"
              disabled={!isEdit}
            />
          </div>
        </SMainDiv>
      </SBorderDiv>
    </>
  );
};

export default DiaryItem;

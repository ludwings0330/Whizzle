import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  diaryDataState,
  diaryState,
  fetchDiaries,
  searchTerm,
} from "../../../store/indexStore";
//import component
import {
  diaryCreate,
  diaryDelete,
  diaryRead,
  diaryUpdate,
} from "../../../apis/diary";
import { getAutocomplete } from "../../../apis/search";

//import css
import styled from "styled-components";

//import images
import good from "../../../assets/img/good.png";
import soso from "../../../assets/img/soso.png";
import sad from "../../../assets/img/sad.png";
import littledrink from "../../../assets/img/littledrink.png";
import normaldrink from "../../../assets/img/normaldrink.png";
import largedrink from "../../../assets/img/largedrink.png";
import { success } from "../../notify/notify";
import Swal from "sweetalert2";

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
  overflow: auto;
`;

const SP = styled.p`
  font-size: 23px;
  font-weight: bold;
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
`;

const SInput = styled.input`
  border: none;
  border-bottom: 2px solid #949494;
  margin-left: 20px;
  width: 320px;
  height: 35px;
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
  margin-left: 20px;
  margin-top: 20px;
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

const SAutoDiv = styled.div`
  border: none;
  margin-left: 20px;
  margin-top: 5px;
  width: 320px;
  height: 35px;
  line-height: 35px;
`;

const DiaryEditor = ({ selectedDate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSave, setIsSave] = useState(true);

  const [auto, setAuto] = useState([]);

  const [data, setData] = useRecoilState(diaryDataState);
  const [diaryList, setDiaryList] = useRecoilState(diaryState);
  const [searchTerms, setSearchTerms] = useRecoilState(searchTerm);

  const [emotionImage, setEmotionImage] = useState(soso);
  const [drinkImage, setDrinkImage] = useState(normaldrink);

  const [drinkLevelValue, setDrinkLevelValue] = useState(50);
  const [emotionValue, setEmotionValue] = useState(50);

  const [emotion, setEmotion] = useState("그냥그래요");
  const [drinkLevel, setDrinkLevel] = useState("적당히");

  const [searchWhisky, setSearchWhisky] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);

  const [content, setContent] = useState("");

  // 검색어 자동완성
  async function autoword(word) {
    if (word.length >= 3) {
      try {
        const autoWord = await getAutocomplete(word);
        setAuto(autoWord);
      } catch (error) {}
    }
  }

  const autoClick = (e) => {
    const id = e.target.id;
    const name = e.target.textContent;
    setSearchWhisky("");
    setAuto([]);
    setSearchTerms([...searchTerms, { id, name }]);
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const setWhiskyName = (e) => {
    if (e.key === "Enter" && searchWhisky !== "") {
      setSearchTerms([...searchTerms, searchWhisky]);

      setSearchWhisky("");
    }
  };

  const wordChange = (e) => {
    setSearchWhisky(e.target.value);
    autoword(e.target.value);
  };

  const deleteSearchWord = (word) => {
    let updateSearchWord = [...searchTerms];
    const existingIndex = updateSearchWord.indexOf(word);
    if (existingIndex !== -1) {
      updateSearchWord.splice(existingIndex, 1);
      setSearchTerms(updateSearchWord);
    }
  };
  useEffect(() => {
    setIsEdit(false);
    setIsSave(!data.id);
    if (data.id) {
      insertData();
    } else {
      initData();
    }
  }, [selectedDate, data]);

  const insertData = () => {
    console.log("insertData ==>", data);
    switch (data.drinkLevel) {
      case "LIGHT":
        setDrinkLevel("소량");
        setDrinkLevelValue(0);
        setDrinkImage(littledrink);
        break;
      case "MODERATE":
        setDrinkLevel("적당히");
        setDrinkLevelValue(50);
        setDrinkImage(normaldrink);
        break;
      case "HAEVY":
        setDrinkLevel("만취");
        setDrinkLevelValue(100);
        setDrinkImage(largedrink);
        break;
    }

    switch (data.emotion) {
      case "BAD":
        setEmotion("별로에요");
        setEmotionValue(0);
        setEmotionImage(sad);
        break;
      case "NORMAL":
        setEmotion("그냥그래요");
        setEmotionValue(50);
        setEmotionImage(soso);
        break;
      case "GOOD":
        setEmotion("최고에요");
        setEmotionValue(100);
        setEmotionImage(good);
        break;
    }

    setContent(data.content);

    const drinks = data.drinks;
    const drinkList = drinks.map((drink) => drink.whisky);

    setSearchTerms(drinkList);
  };

  const initData = () => {
    setIsEdit(false);
    setIsSave(data.id ? false : true);

    setSearchWhisky("");
    setRecentSearch([]);

    setEmotionValue(50);
    setEmotion("그냥그래요");
    setEmotionImage(soso);

    setDrinkLevelValue(50);
    setDrinkLevel("적당히");
    setDrinkImage(normaldrink);

    setContent("");

    const recentSearchData = JSON.parse(sessionStorage.getItem("recentSearch"));
    if (recentSearchData) {
      setRecentSearch(recentSearchData);
    }
    setSearchTerms([]);
  };

  const handleEmotionChange = (e) => {
    const emotionValue = e.target.value;
    setEmotionValue(emotionValue);
    if (emotionValue <= 33) {
      setEmotion("별로예요");
      setEmotionImage(sad);
    } else if (emotionValue <= 66) {
      setEmotion("그냥그래요");
      setEmotionImage(soso);
    } else {
      setEmotion("최고예요");
      setEmotionImage(good);
    }
  };

  const handleDrinklevelChange = (e) => {
    const drinklevelValue = e.target.value;
    setDrinkLevelValue(drinklevelValue);
    if (drinklevelValue <= 33) {
      setDrinkLevel("소량");
      setDrinkImage(littledrink);
    } else if (drinklevelValue <= 66) {
      setDrinkLevel("적당히");
      setDrinkImage(normaldrink);
    } else {
      setDrinkLevel("만취");
      setDrinkImage(largedrink);
    }
  };

  const today = new Date(selectedDate);
  const year = today.getFullYear().toString().padStart(4, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}.${month.padStart(2, "0")}.${day.padStart(
    2,
    "0"
  )}`;

  //위스키 이름, 주량, 기분, 한마디
  const onCreate = async () => {
    const numberSearchTerms = searchTerms.map((whisky) => Number(whisky.id));
    const changeEmotionApi =
      emotionValue < 33 ? "BAD" : emotionValue < 66 ? "NORMAL" : "GOOD";
    const changeDrinkLevelApi =
      drinkLevelValue < 33
        ? "LIGHT"
        : drinkLevelValue < 66
        ? "MODERATE"
        : "HEAVY";

    const newItem = {
      date: formattedDate.replaceAll(".", "-"),
      emotion: changeEmotionApi,
      drinkLevel: changeDrinkLevelApi,
      content,
      whiskyIds: numberSearchTerms,
    };

    const createIsOk = await diaryCreate(newItem);

    if (createIsOk) {
      const updatedData = await diaryRead(formattedDate.slice(0, 7));
      setDiaryList(updatedData);
      await fetchDiaries(setDiaryList, setData, selectedDate);
    }
  };

  const handleSubmit = () => {
    onCreate();
    success("다이어리 저장 성공!");
    setIsSave(false);
  };
  // 추가된 함수
  const handleQuitEdit = () => {
    insertData();
    setIsEdit(false);
  };

  const handleEdit = async () => {
    const changeEmotionApi =
      emotionValue < 33 ? "BAD" : emotionValue < 66 ? "NORMAL" : "GOOD";
    const changeDrinkLevelApi =
      drinkLevelValue < 33
        ? "LIGHT"
        : drinkLevelValue < 66
        ? "MODERATE"
        : "HEAVY";
    const deletedDrinkOrders = [];
    const insertedWhiskyIds = [];

    // data.drinks 기준으로 삭제된 drinkOrder 번호 찾기
    data.drinks.forEach((drink) => {
      if (!searchTerms.includes(drink.whisky)) {
        deletedDrinkOrders.push(drink.drinkOrder);
      }
    });

    // localSearchTerms 기준으로 추가된 whisky id 찾기
    searchTerms.forEach((whisky) => {
      const found = data.drinks.find((drink) => drink.whisky.id === whisky.id);
      if (!found) {
        insertedWhiskyIds.push(whisky.id);
      }
    });

    const editItem = {
      id: data.id,
      emotion: changeEmotionApi,
      drinkLevel: changeDrinkLevelApi,
      content: content,
      insertedWhiskyIds: insertedWhiskyIds.map(Number),
      deletedDrinkOrders: deletedDrinkOrders.map(Number),
    };
    await diaryUpdate(editItem.id, editItem);
    await fetchDiaries(setDiaryList, setData, selectedDate);
    toggleIsEdit();

    success("수정 되었습니다! 🚀");
  };

  const handleClickRemove = async () => {
    Swal.fire({
      title: "삭제 할까요?",
      text: `삭제된 다이어리는 되돌릴 수 없습니다!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedDiaryId = data.id;
        await diaryDelete(deletedDiaryId);
        success("삭제되었습니다!");
        setDiaryList(await diaryRead(month));
        await fetchDiaries(setDiaryList, setData, selectedDate);
        initData();
        setIsSave(true);
      }
    });
  };

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
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
          {isSave ? (
            <SButton style={{ flex: "1" }} onClick={handleSubmit}>
              저장
            </SButton>
          ) : isEdit ? (
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
            {(isSave || isEdit) && (
              <SInput
                value={searchWhisky}
                onChange={wordChange}
                name="whisky"
                onKeyDown={(e) => setWhiskyName(e)}
                placeholder="위스키 이름을 입력해주세요"
                type="text"
                autoComplete="off"
              />
            )}
            {auto && auto.length
              ? auto.map((item, index) => {
                  return (
                    <SAutoDiv onClick={autoClick} key={item.id} id={item.id}>
                      {item.name}
                    </SAutoDiv>
                  );
                })
              : null}
            <div>
              {searchTerms.length > 0 &&
                searchTerms.map((whisky, index) => (
                  <SDiv key={index}>
                    <SP>
                      {whisky.name.length > 6
                        ? `${whisky.name.slice(0, 6)}...`
                        : whisky.name}
                    </SP>
                    {(isSave || isEdit) && (
                      <SButton onClick={() => deleteSearchWord(whisky)}>
                        X
                      </SButton>
                    )}
                  </SDiv>
                ))}
            </div>
          </div>
          <div>
            <SP>오늘의 주량</SP>
            <SRangeContainer>
              <SRangeDiv>
                <STextP>{drinkLevel}</STextP>
                <SImg src={drinkImage} alt={""} />
              </SRangeDiv>
              <SRangeInput
                type="range"
                name="drinklevel"
                min="0"
                max="100"
                step="50"
                value={drinkLevelValue}
                onChange={handleDrinklevelChange}
                disabled={!isEdit && !isSave}
              />
            </SRangeContainer>
          </div>
          <div>
            <SP>오늘의 기분</SP>
            <SRangeContainer>
              <SRangeDiv>
                <STextP>{emotion}</STextP>
                <SImg src={emotionImage} alt={""} />
              </SRangeDiv>
              <SRangeInput
                type="range"
                name="emotion"
                min="0"
                max="100"
                step="50"
                value={emotionValue}
                onChange={handleEmotionChange}
                disabled={!isEdit && !isSave}
              />
            </SRangeContainer>
          </div>
          <div>
            <SP>오늘의 한마디</SP>
            <STextarea
              onChange={contentChange}
              name="content"
              type="text"
              value={content}
              disabled={!isEdit && !isSave}
            />
          </div>
        </SMainDiv>
      </SBorderDiv>
    </>
  );
};
export default DiaryEditor;

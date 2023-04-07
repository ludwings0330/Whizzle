import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { diaryDataState, diaryState, fetchDiaries, searchTerm } from "../../../store/indexStore";
import { motion } from "framer-motion";

//import component
import { diaryCreate, diaryDelete, diaryRead, diaryUpdate } from "../../../apis/diary";
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
import { error, success } from "../../notify/notify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SBorderDiv = styled.div`
  display: inline-block;
  min-width: 400px;
  margin: 0 10px;
  text-align: left;
  padding: 40px;
  overflow: auto;
  border: 1px solid #e1e1e1;
  box-shadow: 15px 15px 25px rgba(162, 162, 162, 0.1);
  border-radius: 8px;
  flex-wrap: wrap;
  margin-top: 25px;
`;

const SP = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const SName = styled.p`
  color: white;
  font-size: 14px;
`;

const SButton = styled.button`
  border: 2px solid #f84f5a;
  border-radius: 12px;
  background: #f84f5a;
  color: white;
  font-size: 15px;
  cursor: pointer;
  width: 60px;
  height: 31px;
  font-family: Pretendard Variable;
`;

const SInput = styled.input`
  border: none;
  border-bottom: 1px solid #949494;
  margin-left: 19px;
  width: 89%;
  height: 35px;
  font-family: Pretendard Variable;
  font-size: 15px;

  &:focus {
    outline: 0;
    background: none;
  }
`;

const SHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 30px;
`;

const SMainDiv = styled.div`
  padding: 0px 15px;
`;

const STextarea = styled.textarea`
  border: 1px solid #adadad;
  border-radius: 8px;
  margin-left: 18px;
  padding: 15px 20px;
  width: 300px;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  font-family: Pretendard Variable;
  background: #fcfcfc;

  &:focus {
    outline: 0;
    background: none;
  }
`;

const SDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  margin-left: 25px;
  margin-top: 10px;
  background: #f84f5a;
  width: fit-content;
  max-width: 300px;
  gap: 5px;
  cursor: pointer;
`;

const SUpdateButton = styled.button`
  border: 1px solid #f84f5a;
  border-radius: 12px;
  background: #fff;
  color: #f84f5a;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  padding-left: 12px;
  padding-right: 12px;
  height: 31px;
  margin-left: 5px;
  font-family: Pretendard Variable;

  :hover {
    transition: all 0.3s;
    background-color: #f84f5a;
    color: #fff;
  }
`;

const SAutoDiv = styled.div`
  cursor: pointer;
  border: none;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 334px;
`;

const SCentered = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 80px;
  justify-content: center;
  align-items: center;
`;

const SRadioInput = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  width: 0;

  &:checked + label {
    color: rgba(248, 79, 90, 0.9);
  }
`;

const SRadioLabel = styled.label`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 70px;
  height: 80px;
  border-radius: 10px;
  color: #888888;
  font-size: 16px;
  transition: 0.2s;
`;

const SCircle = styled.div`
  box-sizing: border-box;
  z-index: 1;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  margin-bottom: 18px;
  background: #fdced1;
  border: 2px solid rgba(248, 79, 90, 0.5);
  transform: matrix(1, 0, 0, -1, 0, 0);
`;

const SLine = styled.div`
  position: absolute;
  z-index: 0;
  width: 318px;
  margin-bottom: 37px;
  border: 1px solid rgba(248, 79, 90, 0.5);
`;

const DiaryEditor = ({ selectedDate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSave, setIsSave] = useState(true);
  const navigate = useNavigate();

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
    if (word.length >= 1) {
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
    if (searchTerms.length < 3) {
      setSearchTerms([...searchTerms, { id, name }]);
    } else {
      error("위스키는 3개까지 저장할 수 있습니다!");
    }
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const setWhiskyName = (e) => {
    if (e.key === "Enter" && searchWhisky !== "") {
      error("자동완성 목록에서 위스키를 선택해주세요!");
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
      case "HEAVY":
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
      setEmotionValue(0);
      setEmotionImage(sad);
    } else if (emotionValue <= 66) {
      setEmotion("그냥그래요");
      setEmotionValue(50);
      setEmotionImage(soso);
    } else {
      setEmotion("최고예요");
      setEmotionValue(100);
      setEmotionImage(good);
    }
  };

  const handleDrinklevelChange = (e) => {
    const drinklevelValue = e.target.value;
    setDrinkLevelValue(drinklevelValue);
    if (drinklevelValue <= 33) {
      setDrinkLevel("소량");
      setDrinkLevelValue(0);
      setDrinkImage(littledrink);
    } else if (drinklevelValue <= 66) {
      setDrinkLevel("적당히");
      setDrinkLevelValue(50);
      setDrinkImage(normaldrink);
    } else {
      setDrinkLevel("만취");
      setDrinkLevelValue(100);
      setDrinkImage(largedrink);
    }
  };

  const today = new Date(selectedDate);
  const year = today.getFullYear().toString().padStart(4, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}.${month.padStart(2, "0")}.${day.padStart(2, "0")}`;

  //위스키 이름, 주량, 기분, 한마디
  const onCreate = async () => {
    const numberSearchTerms = searchTerms.map((whisky) => Number(whisky.id));
    const changeEmotionApi = emotionValue < 33 ? "BAD" : emotionValue < 66 ? "NORMAL" : "GOOD";
    const changeDrinkLevelApi =
      drinkLevelValue < 33 ? "LIGHT" : drinkLevelValue < 66 ? "MODERATE" : "HEAVY";

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
    if (searchTerms.length === 0) {
      error("위스키를 한 개 이상 입력해주세요");
      return;
    }
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
    if (searchTerms.length === 0) {
      error("위스키를 한 개 이상 입력해주세요");
      return;
    }
    const changeEmotionApi = emotionValue < 33 ? "BAD" : emotionValue < 66 ? "NORMAL" : "GOOD";
    const changeDrinkLevelApi =
      drinkLevelValue < 33 ? "LIGHT" : drinkLevelValue < 66 ? "MODERATE" : "HEAVY";
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
      customClass: {
        container: "my-swal-container",
        confirmButton: "my-swal-confirm-button",
        cancelButton: "my-swal-cancel-button",
        icon: "my-swal-icon",
      },
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
              fontSize: "24px",
              marginTop: "0px",
              marginBottom: "0px",
              color: "#F84F5A",
              flex: "1",
            }}
          >
            {formattedDate}
          </SP>
          {isSave ? (
            <SButton onClick={handleSubmit}>저장</SButton>
          ) : isEdit ? (
            <>
              <SUpdateButton onClick={handleQuitEdit}>수정취소</SUpdateButton>
              <SUpdateButton onClick={handleEdit}>수정완료</SUpdateButton>
            </>
          ) : (
            <>
              <SUpdateButton onClick={toggleIsEdit}>수정</SUpdateButton>
              <SUpdateButton onClick={handleClickRemove}>삭제</SUpdateButton>
            </>
          )}
        </SHeaderDiv>
        <SMainDiv>
          <div style={{ position: "relative" }}>
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
            <div
              style={{
                position: "absolute",
                zIndex: "2",
                backgroundColor: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                borderRadius: "8px",
              }}
            >
              {auto && auto.length
                ? auto.map((item, index) => {
                    return (
                      <SAutoDiv onClick={autoClick} key={item.id} id={item.id}>
                        {item.name}
                        <hr style={{ pointerEvents: "none" }} />
                      </SAutoDiv>
                    );
                  })
                : null}
            </div>
            <div>
              {searchTerms.map((whisky, index) => (
                <SDiv
                  key={index}
                  onClick={() => (!(isSave || isEdit) ? navigate(`/whisky/${whisky.id}`) : null)}
                >
                  <SName>
                    {whisky.name?.length > 37 ? `${whisky.name?.slice(0, 37)}...` : whisky.name}
                  </SName>
                  {(isSave || isEdit) && (
                    <button
                      style={{
                        color: "white",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontFamily: "Pretendard Variable",
                      }}
                      onClick={() => deleteSearchWord(whisky)}
                    >
                      X
                    </button>
                  )}
                </SDiv>
              ))}
            </div>
          </div>
          <div>
            <SP>오늘의 주량</SP>
            <SCentered>
              <SRadioInput
                id="one"
                type="radio"
                value="0"
                checked={drinkLevelValue === 0}
                onChange={handleDrinklevelChange}
                disabled={!isEdit && !isSave}
              />
              <SRadioLabel htmlFor="one">
                <SCircle />
                <span>소량</span>
                {drinkLevelValue === 0 ? (
                  <motion.img
                    src={littledrink}
                    layoutId="drinkSelectedBox"
                    style={{
                      position: "absolute",
                      width: "30px",
                      top: "7px",
                      zIndex: "1",
                    }}
                  />
                ) : (
                  ""
                )}
              </SRadioLabel>
              <SRadioInput
                id="two"
                type="radio"
                value="50"
                checked={drinkLevelValue === 50}
                onChange={handleDrinklevelChange}
                disabled={!isEdit && !isSave}
              />
              <SRadioLabel htmlFor="two">
                <SCircle />
                <span>적당히</span>
                {drinkLevelValue === 50 ? (
                  <motion.img
                    src={normaldrink}
                    layoutId="drinkSelectedBox"
                    style={{
                      position: "absolute",
                      width: "47px",
                      top: "4px",
                      zIndex: "1",
                    }}
                  />
                ) : (
                  ""
                )}
              </SRadioLabel>
              <SRadioInput
                id="three"
                type="radio"
                value="100"
                checked={drinkLevelValue === 100}
                onChange={handleDrinklevelChange}
                disabled={!isEdit && !isSave}
              />
              <SRadioLabel htmlFor="three">
                <SCircle />
                <span>만취</span>
                {drinkLevelValue === 100 ? (
                  <motion.img
                    src={largedrink}
                    layoutId="drinkSelectedBox"
                    style={{
                      position: "absolute",
                      top: "0px",
                      zIndex: "1",
                    }}
                  />
                ) : (
                  ""
                )}
              </SRadioLabel>
              <SLine />
            </SCentered>
          </div>
          <div>
            <SP>오늘의 기분</SP>
            <SCentered>
              <SRadioInput
                id="sad"
                type="radio"
                value="0"
                checked={emotionValue === 0}
                onChange={handleEmotionChange}
                disabled={!isEdit && !isSave}
              />
              <SRadioLabel htmlFor="sad">
                <SCircle />
                <span>별로예요</span>
                {emotionValue === 0 ? (
                  <motion.img
                    src={sad}
                    layoutId="selectedBox"
                    style={{
                      position: "absolute",
                      width: "38px",
                      top: "3px",
                      zIndex: "1",
                    }}
                  />
                ) : (
                  ""
                )}
              </SRadioLabel>
              <SRadioInput
                id="soso"
                type="radio"
                value="50"
                checked={emotionValue === 50}
                onChange={handleEmotionChange}
                disabled={!isEdit && !isSave}
              />
              <SRadioLabel htmlFor="soso">
                <SCircle />
                <span>그냥그래요</span>
                {emotionValue === 50 ? (
                  <motion.img
                    src={soso}
                    layoutId="selectedBox"
                    style={{
                      position: "absolute",
                      width: "38px",
                      top: "3px",
                      zIndex: "1",
                    }}
                  />
                ) : (
                  ""
                )}
              </SRadioLabel>
              <SRadioInput
                id="good"
                type="radio"
                value="100"
                checked={emotionValue === 100}
                onChange={handleEmotionChange}
                disabled={!isEdit && !isSave}
              />
              <SRadioLabel htmlFor="good">
                <SCircle />
                <span>최고예요</span>
                {emotionValue === 100 ? (
                  <motion.img
                    src={good}
                    layoutId="selectedBox"
                    style={{
                      position: "absolute",
                      width: "38px",
                      top: "3px",
                      zIndex: "1",
                    }}
                  />
                ) : (
                  ""
                )}
              </SRadioLabel>
              <SLine />
            </SCentered>
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

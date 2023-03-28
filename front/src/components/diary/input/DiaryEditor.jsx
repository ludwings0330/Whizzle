import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { diaryDataState } from "../../../store/indexStore";
//import component
import { diaryCreate } from "../../../apis/diary";

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

const DiaryEditor = ({ selectedDate }) => {
  const [data, setData] = useRecoilState(diaryDataState);

  const [emotionImage, setEmotionImage] = useState(soso);
  const [drinkImage, setDrinkImage] = useState(normaldrink);

  const [drinklevelValue, setDrinklevelValue] = useState(50);
  const [emotionValue, setEmotionValue] = useState(50);

  const [emotion, setEmotion] = useState("그냥그래요");
  const [drinklevel, setDrinklevel] = useState("적당히");

  const [searchWhisky, setSearchWhisky] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);

  const [content, setContent] = useState("");

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const setWhiskyName = (e) => {
    if (e.key === "Enter" && searchWhisky !== "") {
      setRecentSearch([...recentSearch, searchWhisky]);
      setSearchWhisky("");
    }
  };

  const wordChange = (e) => {
    setSearchWhisky(e.target.value);
  };

  const deleteRecentSearchWord = (word) => {
    let updatedRecentSearch = [...recentSearch];
    const existingIndex = updatedRecentSearch.indexOf(word);
    if (existingIndex !== -1) {
      updatedRecentSearch.splice(existingIndex, 1);
      setRecentSearch(updatedRecentSearch);
    }
  };

  useEffect(() => {
    setSearchWhisky("");
    setRecentSearch([]);
    setEmotionValue(50);
    setDrinklevelValue(50);
    setEmotion("그냥그래요");
    setDrinklevel("적당히");
    setContent("");
    const recentSearchData = JSON.parse(sessionStorage.getItem("recentSearch"));
    if (recentSearchData) {
      setRecentSearch(recentSearchData);
    }
  }, []);

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
    setDrinklevelValue(drinklevelValue);
    if (drinklevelValue <= 33) {
      setDrinklevel("소량");
      setDrinkImage(littledrink);
    } else if (drinklevelValue <= 66) {
      setDrinklevel("적당히");
      setDrinkImage(normaldrink);
    } else {
      setDrinklevel("만취");
      setDrinkImage(largedrink);
    }
  };

  //위스키 이름, 주량, 기분, 한마디
  const onCreate = async () => {
    const numberSearchTerms = recentSearch.map(Number);
    const changeEmotionApi = emotionValue === 0 ? "BAD" : emotionValue === 50 ? "NORMAL" : "GOOD";
    const changeDrinkLevelApi =
      drinklevelValue === 0 ? "LIGHT" : drinklevelValue === 50 ? "MODERATE" : "HEAVY";
    const newItem = {
      date: today.replaceAll(".", "-"),
      emotion: changeEmotionApi,
      drinkLevel: changeDrinkLevelApi,
      content,
      whiskyIds: numberSearchTerms,
    };

    const newDrinks = numberSearchTerms.map((id, index) => {
      return {
        whisky: {
          id: id,
          name: id.toString(),
        },
        drinkOrder: index,
      };
    });
    setData({
      data: newItem.date,
      emotion: changeEmotionApi,
      drinkLevel: changeDrinkLevelApi,
      content: content,
      drinks: newDrinks,
    });

    const createIsOk = await diaryCreate(newItem);

    if (createIsOk) {
    }
  };

  const handleSubmit = () => {
    onCreate();
    console.log("등록?");
    alert("등록 완료");
  };

  const today = new Date(selectedDate);
  const year = today.getFullYear().toString().padStart(4, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}.${month.padStart(2, "0")}.${day.padStart(2, "0")}`;

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
          <SButton sytle={{ flex: "1" }} onClick={handleSubmit}>
            저장
          </SButton>
        </SHeaderDiv>
        <SMainDiv>
          <div>
            <SP>오늘의 위스키</SP>
            <SInput
              value={searchWhisky}
              onChange={wordChange}
              name="whisky"
              onKeyDown={(e) => setWhiskyName(e)}
              placeholder="위스키 이름을 입력해주세요"
              type="text"
            />
            <div>
              {recentSearch.map((word, index) => (
                <SDiv key={index}>
                  <SP>{word.length > 6 ? `${word.slice(0, 6)}...` : word}</SP>
                  <SButton onClick={() => deleteRecentSearchWord(word)}>X</SButton>
                </SDiv>
              ))}
            </div>
          </div>
          <div>
            <SP>오늘의 주량</SP>
            <SRangeContainer>
              <SRangeDiv>
                <STextP>{drinklevel}</STextP>
                <SImg src={drinkImage} alt={""} />
              </SRangeDiv>
              <SRangeInput
                type="range"
                name="drinklevel"
                min="0"
                max="100"
                step="50"
                onChange={handleDrinklevelChange}
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
                onChange={handleEmotionChange}
              />
            </SRangeContainer>
          </div>
          <div>
            <SP>오늘의 한마디</SP>
            <STextarea onChange={contentChange} name="content" type="text" />
          </div>
        </SMainDiv>
      </SBorderDiv>
    </>
  );
};

export default DiaryEditor;

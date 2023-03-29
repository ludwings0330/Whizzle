import React, { useEffect, useState, useRef } from "react";
import {
  diaryState,
  diaryDataState,
  currentComponentState,
  fetchDiaries,
} from "../../../store/indexStore";
import { useRecoilState, useRecoilValue } from "recoil";
import { diaryRead } from "../../../apis/diary";

//import css
import styled from "styled-components";
import DiaryEditor from "../input/DiaryEditor";

const SDiv = styled.div`
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  display: inline-block;
  width: 770px;
  height: 580px;
  margin: 0 10px;
  padding: 40px 60px 40px 40px;
  box-shadow: 5px 5px 5px #e1e1e1;
`;

const SHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  text-align: center;
`;

const SDateP = styled.p`
  background-image: linear-gradient(to right, #f84f5a, #f6cb5a);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  font-size: 50px;
  margin-top: 0;
  margin-bottom: 30px;
`;

const SCalanderDiv = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
    color: #212529;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    vertical-align: top;
    border-top: 2px solid #dee2e6;
    font-weight: bold;
  }

  td {
    &:hover {
      background: #f84f5a;
      color: white;
    }
  }

  th {
    text-align: inherit;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    padding: 25px;
  }

  td {
    border-bottom: 1px solid #dee2e6;
    padding: 25px;
  }
`;

const SPrevButton = styled.button`
  border: none;
  background: none;
  font-size: 60px;
  line-height: 1;
  padding: 10;
  cursor: pointer;

  &::before {
    content: "<";
    color: #f84f5a;
  }
`;

const SNextButton = styled.button`
  border: none;
  background: none;
  font-size: 60px;
  line-height: 1;
  padding: 10;
  margin-bottom: 10px;
  cursor: pointer;

  &::before {
    content: ">";
    color: #f84f5a;
  }
`;

const STbody = styled.tbody`
  .selected-day {
    background-color: #f84f5a;
    color: white;
  }
`;

//다이어리 캘린더
const DiaryCalander = ({ onDateClick }) => {
  const [date, setDate] = useState(new Date());
  const [currentComponent, setCurrentComponent] = useRecoilState(currentComponentState);
  const tbodyRef = useRef(null);

  function prevMonth() {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  }

  function nextMonth() {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function getLastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  }

  const [clickedDay, setClickedDay] = useState(null);

  const [diaryList, setDiaryList] = useRecoilState(diaryState);
  const [data, setData] = useRecoilState(diaryDataState);

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    fetchDiaries(setDiaryList, setData, `${year}-${month}`);
  }, [date]);

  useEffect(() => {
    const diaryArray = Array.isArray(diaryList) ? diaryList : [];

    if (tbodyRef.current) {
      const tbody = tbodyRef.current;

      diaryArray.forEach((diary) => {
        const diaryDate = new Date(diary.date);
        if (
          diaryDate.getFullYear() === date.getFullYear() &&
          diaryDate.getMonth() === date.getMonth()
        ) {
          const dayElement = tbody.querySelector(`td[data-date="${diary.date}"]`);
          if (dayElement) {
            console.log(diaryDate);

            dayElement.style.backgroundColor = "#f84f5a";
            dayElement.style.color = "white";
          }
        }
      });
    }
  }, [diaryList, tbodyRef]);

  function hasDiaryEntry(dateString) {
    return diaryList.some((entry) => entry.date === dateString);
  }

  function findItem(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].date === value) {
        return arr[i];
      }
    }
    return -1;
  }

  function handleDateClick(event) {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), event.target.textContent);
    const year = clickedDate.getFullYear();
    const month = clickedDate.getMonth() + 1;
    const day = clickedDate.getDate();
    const clickedDateString = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;

    const now = new Date();
    if (clickedDate > now) {
      alert("오늘 이후의 날짜는 선택할 수 없습니다!");
      return;
    }
    if (clickedDay) {
      clickedDay.classList.remove("selected-day");
    }
    event.target.classList.add("selected-day");
    setClickedDay(event.target);

    const diaryItem = findItem(diaryList, clickedDateString);
    if (diaryItem === -1) {
      onDateClick(clickedDateString);
      setCurrentComponent("diaryEditor");
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
      return;
    }

    setCurrentComponent("diaryNewContent");
    setData(diaryItem);

    //diaryItem 이 -1이면 Editor를 띄워주기
    //아니라면 DiaryItem 자체를 보여주기

    onDateClick(clickedDateString);
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const lastDayOfMonth = getLastDayOfMonth(date);

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<td key={`prev-${i}`}></td>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <td key={`${date.getFullYear()}-${date.getMonth()}-${i}`} onClick={handleDateClick}>
        {i}
      </td>
    );
  }

  for (let i = 0; i < 6 - lastDayOfMonth; i++) {
    days.push(<td key={`next-${i}`}></td>);
  }

  const rows = [];
  let cells = [];

  days.forEach((day, index) => {
    if (index % 7 !== 0 || index === 0) {
      cells.push(day);
    } else {
      rows.push(<tr key={index}>{cells}</tr>);
      cells = [day];
    }
  });

  rows.push(<tr key={days.length}>{cells}</tr>);

  return (
    <>
      <SDiv>
        <SHeaderDiv>
          <SPrevButton onClick={prevMonth}></SPrevButton>
          <SDateP>{date.toLocaleString("en-US", { month: "long", year: "numeric" })}</SDateP>
          <SNextButton onClick={nextMonth}></SNextButton>
        </SHeaderDiv>
        <SCalanderDiv>
          <table>
            <thead>
              <tr>
                {weekdays.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <STbody ref={tbodyRef}>{rows}</STbody>
          </table>
        </SCalanderDiv>
      </SDiv>
    </>
  );
};

export default DiaryCalander;

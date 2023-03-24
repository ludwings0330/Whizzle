import React, { useState } from "react";

//import css
import styled from "styled-components";

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
  border: 1px solid black;
`;

//다이어리 캘린더
const DiaryCalander = ({ onDateClick }) => {
  const [date, setDate] = useState(new Date());

  // 각 날짜별로 고유한 key 값을 생성하는 함수
  function getKey(year, month, day) {
    return `${year}-${month}-${day}`;
  }

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

  function handleDateClick(event) {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), event.target.textContent);
    const year = clickedDate.getFullYear();
    const month = clickedDate.getMonth() + 1;
    const day = clickedDate.getDate() + 1;
    const clickedDateString = `${year}.${month}.${day}`;

    const now = new Date();
    if (clickedDate > now) {
      alert("오늘 이후의 날짜는 선택할 수 없습니다!");
      return;
    }

    if (clickedDay) {
      clickedDay.style.backgroundColor = "white";
    }
    event.target.style.backgroundColor = "#F84F5A";
    setClickedDay(event.target);
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
            <tbody>{rows}</tbody>
          </table>
        </SCalanderDiv>
      </SDiv>
    </>
  );
};

export default DiaryCalander;

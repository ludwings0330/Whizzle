import React, { useState } from "react";

//import css
import styled from "styled-components";

const SDiv = styled.div`
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  float: left;
  width: 770px;
  height: 580px;
  margin: 0 10px;
  padding: 40px 60px 40px 40px;
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

  function handleDateClick(event) {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), event.target.textContent);
    const year = clickedDate.getFullYear();
    const month = clickedDate.getMonth() + 1;
    const day = clickedDate.getDate();
    const clickedDateString = `${year}.${month}.${day}`;
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
        <h2>{date.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
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
        <button onClick={prevMonth}>Prev</button>
        <button onClick={nextMonth}>Next</button>
      </SDiv>
    </>
  );
};

export default DiaryCalander;

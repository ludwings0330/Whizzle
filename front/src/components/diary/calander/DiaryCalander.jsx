import React, { useEffect, useState } from "react";
import { diaryDataState, diaryState, fetchDiaries, searchTerm } from "../../../store/indexStore";
import { useRecoilState } from "recoil";

//import css
import styled from "styled-components";
import { error } from "../../notify/notify";

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 35px;
  border: 1px solid #e1e1e1;
  box-shadow: 15px 15px 25px rgba(162, 162, 162, 0.1);
  border-radius: 8px;
  margin-top: 25px;
`;

const SHeaderDiv = styled.div`
  width: 660px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
`;

const SDateP = styled.p`
  background-image: linear-gradient(to right, #f84f5a, #f6cb5a);
  -webkit-background-clip: text;
  -moz-background-clip: inherit;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  font-size: 32px;
  margin-top: 0;
  margin-bottom: 0px;
`;

const SCalanderDiv = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    color: #212529;
    font-size: 20px;
    text-align: center;
  }

  th,
  td {
    vertical-align: top;
  }

  th {
    text-align: inherit;
    font-size: 24px;
    font-weight: bold;
    padding-top: 3px;
    padding-bottom: 18px;
  }

  td {
    cursor: pointer;
    padding: 22px 10px;
    width: 80px;

    &:hover {
      background: #eeeeee;
    }
  }
`;

const SPrevButton = styled.button`
  border: none;
  background: none;
  font-size: 50px;
  line-height: 1;
  padding: 10px;
  cursor: pointer;

  &::before {
    content: "<";
    color: #f84f5a;
  }
`;

const SNextButton = styled.button`
  border: none;
  background: none;
  font-size: 50px;
  line-height: 1;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &::before {
    content: ">";
    color: #f84f5a;
  }
`;

const STbody = styled.tbody`
  .selected-day {
    background: #eeeeee;
  }
`;

//다이어리 캘린더
const DiaryCalander = ({ setSelectedDate, selectedDate }) => {
  function prevMonth() {
    setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  }

  function nextMonth() {
    setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
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
  const [diaryList, setDiaryList] = useRecoilState(diaryState); // 달 리스트
  const [data, setData] = useRecoilState(diaryDataState); // 하나
  const [searchTerms, setSearchTerms] = useRecoilState(searchTerm);

  useEffect(() => {
    fetchDiaries(setDiaryList, setData, selectedDate).then((response) => {
      if (!response) {
        initDataSet();
      }
    });
  }, [selectedDate]);

  useEffect(() => {
    const drinks = data.drinks;
    const drinkList = drinks.map((drink) => drink.whisky);
    setSearchTerms(drinkList);
  }, [data]);

  const findItem = (arr, value) => {
    for (const element of arr) {
      if (element.date === value) {
        return element;
      }
    }
    return -1;
  };
  const initDataSet = () => {
    setData({
      id: null,
      date: "",
      today: "",
      emotion: "",
      drinkLevel: "",
      content: "",
      drinks: [],
    });
    setSearchTerms([]);
  };
  const handleDateClick = (event) => {
    const clickedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      event.target.textContent
    );

    const year = clickedDate.getFullYear();
    const month = clickedDate.getMonth() + 1;
    const day = clickedDate.getDate();

    const clickedDateString = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;

    const now = new Date();
    if (clickedDate > now) {
      error("오늘 이후의 날짜는 선택할 수 없습니다!");
      return;
    }

    if (clickedDay) {
      clickedDay.classList.remove("selected-day");
    }

    event.target.classList.add("selected-day");
    setClickedDay(event.target);

    const diaryItem = findItem(diaryList, clickedDateString);
    if (diaryItem === -1) {
      initDataSet();
    } else {
      setData(diaryItem);
    }
    setSelectedDate(clickedDate);
  };

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
  const lastDayOfMonth = getLastDayOfMonth(selectedDate);

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(`prev-${i}`);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${i}`);
  }

  for (let i = 0; i < 6 - lastDayOfMonth; i++) {
    days.push(`next-${i}`);
  }

  const rows = [];
  let cells = [];

  days.forEach((day, index) => {
    if (index % 7 !== 0 || index === 0) {
      cells.push(day);
    } else {
      rows.push({ cells });
      cells = [day];
    }
  });

  rows.push({ cells });

  useEffect(() => {
    const activeDays = document.querySelectorAll(".active-day");

    activeDays.forEach((activeDay) => {
      const dataKey = activeDay.getAttribute("data-key");
      const [rowIndex, dayIndex] = dataKey.split("-");

      let dateStr = rows[rowIndex].cells[dayIndex]; // 2023-3-18 vs 2023-03-18
      dateStr = dateStr.split("-");

      dateStr = `${dateStr[0]}-${Number(dateStr[1]) < 10 ? "0" : ""}${Number(dateStr[1])}-${
        Number(dateStr[2]) < 10 ? "0" : ""
      }${Number(dateStr[2])}`;

      if (diaryList) {
        const result = diaryList.find((diary) => diary.date === dateStr);

        if (result) {
          switch (result.drinkLevel) {
            case "LIGHT":
              activeDay.style.backgroundColor = "#FFE2E4";
              break;
            case "MODERATE":
              activeDay.style.backgroundColor = "#FFA7AC";
              break;
            case "HEAVY":
              activeDay.style.backgroundColor = "#FF7C85";
              break;
          }
          activeDay.style.color = "#fff";
        }
      }
    });
  }, [diaryList, data, rows]);

  return (
    <>
      <SDiv>
        <SHeaderDiv>
          <SPrevButton onClick={prevMonth}></SPrevButton>
          <SDateP>
            {selectedDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </SDateP>
          <SNextButton onClick={nextMonth}></SNextButton>
        </SHeaderDiv>
        <SCalanderDiv key={diaryList}>
          <table>
            <thead>
              <tr>
                {weekdays.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <STbody onClick={handleDateClick}>
              {rows.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {row.cells.map((day, dayIndex) => {
                      let content;
                      let className = "";
                      if (day.includes("prev")) {
                        content = "";
                      } else if (day.includes("next")) {
                        content = "";
                      } else {
                        content = new Date(day).getDate();
                        className = "active-day";
                      }
                      return (
                        <td
                          key={`${rowIndex}-${dayIndex}`}
                          data-key={`${rowIndex}-${dayIndex}`}
                          className={className}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </STbody>
          </table>
        </SCalanderDiv>
      </SDiv>
    </>
  );
};

export default DiaryCalander;

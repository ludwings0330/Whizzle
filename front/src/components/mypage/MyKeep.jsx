import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { keepApi } from "../../apis/mypage";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";

import WhiskyList from "../common/WhiskyList";

const SContainer = styled.div`
  max-width: 780px;
  height: 387px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-bottom: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  align-items: flex-start;
`;

const SWarning = styled.div`
  width: 1000px;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

//마이페이지 내가 킵한 위스키
const MyKeep = ({ memberId }) => {
  const user = useRecoilValue(userState);

  const memberIdToUse = memberId ?? user.id;

  const [whiskys, setWhiskys] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          myKeepApi();
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (observerRef.current && !isLast) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, lastId, memberIdToUse]);

  const myKeepApi = async () => {
    const params = {
      memberId: memberIdToUse, // memberId가 없는 경우 id를 사용
      lastOffset: lastId,
      size: 9,
    };
    if (!isLoading && !isLast) {
      setIsLoading(true);
      try {
        const keepedData = await keepApi(params);
        const keepedWhiskys = keepedData.content;
        setWhiskys((prev) => {
          return [...prev, ...keepedWhiskys];
        });
        if (keepedData.last === true) {
          setIsLast(true);
        }
        setLastId(keepedWhiskys[keepedWhiskys.length - 1].id);
      } catch {}
      setIsLoading(false);
    }
  };

  return (
    <>
      <SListDiv>
        {whiskys.length > 0 ? (
          <WhiskyList whiskys={whiskys} />
        ) : (
          <SWarning>
            <span>현재 킵한 위스키가 없습니다</span>
            <span>내게 맞는 위스키 추천 받아보세요!</span>
          </SWarning>
        )}
      </SListDiv>
      <div ref={observerRef}></div>
    </>
  );
};

export default MyKeep;

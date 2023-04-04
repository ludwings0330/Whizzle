import React, { useState, useRef } from "react";
import styled from "styled-components";
import WhiskySimilarListItem from "./WhiskySimilarListItem";
import { throttle } from "../../hooks/throttle";

const SContainer = styled.div`
  width: 800px;
  max-width: 100%;
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  & > * {
    :not(:last-child) {
      margin-right: 16px;
    }
  }
`;

//유사한 위스키 추천 리스트
const WhiskySimilarList = (props) => {
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [originX, setOriginX] = useState(false);
  const [notScroll, setNotScroll] = useState(false);
  const [startX, setStartX] = useState();

  // 유사 위스키의 x-scroll 관련 로직
  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
    setOriginX(e.pageX);
  };

  const onDragEnd = (e) => {
    const diff = Math.abs(originX - e.pageX);
    if (diff < 5) {
      setNotScroll(true);
    } else {
      setNotScroll(false);
    }
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;
      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };
  const delay = 10;
  const onThrottleDragMove = throttle(onDragMove, delay);

  return (
    <SContainer
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}
    >
      {props.whiskys.map((whisky, index) => {
        return (
          <WhiskySimilarListItem notScroll={notScroll} key={index} whisky={whisky} index={index} />
        );
      })}
    </SContainer>
  );
};

export default WhiskySimilarList;

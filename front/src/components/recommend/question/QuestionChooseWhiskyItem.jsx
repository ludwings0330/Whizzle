import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/indexStore";
import styled from "styled-components";
import { warning } from "../../notify/notify";

const SWrap = styled.div`
  cursor: pointer;
  position: relative;
`;

const SCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isMobile ? "30vw" : "226px")};
  height: ${(props) => (props.isMobile ? "35vw" : "291px")};
  left: 722px;
  top: 427px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  transition: 0.5s;
  background: ${(props) => (props.isClicked ? "white" : "rgba(255, 255, 255, 0.2)")};
  box-shadow: ${(props) => (props.isClicked ? "0px 4px 50px rgba(255, 255, 255, 0.5)" : "")};

  ${SWrap}:hover & {
    background: white;
    transition: 0.5s;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  }
`;

const SImg = styled.img`
  height: ${(props) => (props.isMobile ? "32vw" : "245px")};
  transition: 0.5s;
  transform-origin: bottom;
  transform: ${(props) => (props.isClicked ? "scale(1.1)" : "")};

  ${SWrap}:hover & {
    transform: scale(1.1);
    transition: 0.5s;
  }
`;

const SName = styled.p`
  font-size: ${(props) => (props.isMobile ? "0.7rem" : "16px")};
  padding-top: ${(props) => (props.isMobile ? "0px" : "15px")};
  padding-bottom: ${(props) => (props.isMobile ? "4vh" : "50px")};
  color: ${(props) => (props.isClicked ? "#181818" : "white")};
  font-weight: ${(props) => (props.isClicked ? "bold" : "")};

  ${SWrap}:hover & {
    color: #181818;
    font-weight: bold;
  }
`;

const QuestionChooseWhiskyItem = (props) => {
  const isMobile = props.isMobile;
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);
  const [isClicked, setIsClicked] = useState(false);

  const whiskySelectHandler = () => {
    const selectedId = props.whisky.id;
    const selectedIndex = preferenceValue.whiskies?.indexOf(selectedId);

    if (selectedIndex === -1) {
      if (preferenceValue.whiskies.length > 2) {
        warning("3개를 모두 선택하셨습니다!");
      } else {
        setPreferenceValue((prev) => ({
          ...prev,
          whiskies: [...prev.whiskies, selectedId],
        }));
        setIsClicked(true);
      }
    } else {
      setPreferenceValue((prev) => ({
        ...prev,
        whiskies: prev.whiskies?.filter((whisky) => whisky !== selectedId),
      }));
      setIsClicked(false);
    }
  };

  useEffect(() => {
    if (preferenceValue.whiskies?.indexOf(props.whisky.id) !== -1) {
      setIsClicked(true);
    }
  }, []);

  return (
    <SWrap onClick={whiskySelectHandler}>
      <SCard isMobile={isMobile} isClicked={isClicked}>
        <SImg
          isMobile={isMobile}
          src={require(`../../../assets/img/whisky_preset/${props.whisky.id}.png`)}
          alt={props.whisky.img}
          isClicked={isClicked}
        />
        <SName isMobile={isMobile} isClicked={isClicked}>
          {props.whisky.name}
        </SName>
      </SCard>
    </SWrap>
  );
};

export default QuestionChooseWhiskyItem;

import React, { useState } from "react";
import styled from "styled-components";

const SWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SCard = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 121px;
  height: 121px;
  background: #ebebeb;
  border-radius: 999px;
  transition: 0.5s;
  ${({ shadowLevel }) => `box-shadow: 0px 0px 25px rgba(248, 79, 90, ${shadowLevel});`}
  display: flex;
`;

const SImg = styled.img`
  width: 100px;
  transition: 0.5s;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const SBalloon = styled.div`
  position: absolute;
  z-index: 1;
  justify-content: center;
  align-items: center;
  min-width: 240px;
  padding: 6px 20px;
  top: 135px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  display: ${({ isHover }) => (isHover ? "flex" : "none")};
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-bottom-color: rgba(255, 255, 255, 0.9);
  }
`;

const SBalloonText = styled.p`
  font-size: 17px;
  color: black;
`;

const MyBadgeItem = (props) => {
  const [isHover, setIsHover] = useState(false);
  const { badge, description } = props;

  return (
    <>
      <SWrap>
        {badge && (
          <SCard
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            hasValue={description}
          >
            {badge.description !== "" ? (
              <SBalloon isHover={isHover}>
                <SBalloonText>{badge.description}</SBalloonText>
              </SBalloon>
            ) : (
              ""
            )}
            <SImg
              src={badge.url}
              alt={badge.description}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            />
          </SCard>
        )}
      </SWrap>
    </>
  );
};

export default MyBadgeItem;

import React from "react";
import styled from "styled-components";

const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SCard = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 91px;
  height: 91px;
  background: #d9d9d9;
  border-radius: 30px;
  transition: 0.5s;
  ${({ shadowLevel }) => `box-shadow: 0px 0px 25px rgba(248, 79, 90, ${shadowLevel});`}
  }
`;

const SImg = styled.img`
  height: 245px;
  transition: 0.5s;
  }
`;

const SName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #181818;
  margin-top: 8px;
  }
`;

const MyBadgeItem = (props) => {
  return <></>;
};

export default MyBadgeItem;

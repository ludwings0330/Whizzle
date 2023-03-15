import React from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/preferenceStore";
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
  ${({ shadowLevel }) =>
    `box-shadow: 0px 0px 25px rgba(248, 79, 90, ${shadowLevel});`}
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

const QuestionChooseFlavorItem = (props) => {
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);

  const preferFlavor = props.flavor;
  const onClickHandler = () => {
    setPreferenceValue((prev) => {
      return {
        ...prev,
        flavor: {
          ...prev.flavor,
          [preferFlavor]:
            prev.flavor[preferFlavor] + 25 > 100
              ? 0
              : prev.flavor[preferFlavor] + 25,
        },
      };
    });
  };

  return (
    <SWrap>
      <SCard
        onClick={onClickHandler}
        shadowLevel={preferenceValue.flavor[props.flavor] * 0.01}
      >
        {/* <SImg
          src={require(`../../../assets/img/whisky_preset/${props.whisky.id}.png`)}
          alt={props.whisky.img}
          isClicked={isClicked}
        /> */}
      </SCard>
      <SName>{props.flavor}</SName>
    </SWrap>
  );
};

export default QuestionChooseFlavorItem;

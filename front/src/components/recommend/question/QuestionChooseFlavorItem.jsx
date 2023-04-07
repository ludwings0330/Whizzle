import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { preference } from "../../../store/indexStore";
import styled from "styled-components";

const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SCard = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isMobile ? "15vw" : "91px")};
  height: ${(props) => (props.isMobile ? "15vw" : "91px")};
  background: #EEEEEE;
  border-radius: ${(props) => (props.isMobile ? "20px" : "30px")};
  transition: 0.5s;
  ${({ shadowLevel }) => `box-shadow: 0px 0px 25px rgba(248, 79, 90, ${shadowLevel});`}
  }
`;

const SImg = styled.img`
  width: ${(props) => (props.isMobile ? "13vw" : "75px")};
  transition: 0.5s;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const SFront = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isMobile ? "15vw" : "91px")};
  height: ${(props) => (props.isMobile ? "15vw" : "91px")};
  border-radius: ${(props) => (props.isMobile ? "20px" : "30px")};
  transition: 0.5s;
  font-size: ${(props) => (props.isMobile ? "1rem" : "18px")};
  color: #666666;
  background: rgba(238, 238, 238, 0.8);
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const SName = styled.p`
  font-size: 14px;
  color: #999999;
  margin-top: 8px;
  }
`;

const SBalloon = styled.div`
  position: absolute;
  z-index: 1;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  padding: 18px 23px;
  top: ${(props) => (props.isMobile ? "11.5vh" : "130px")};
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  display: ${(props) => (props.isHover ? "flex" : "none")};
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
  font-size: ${(props) => (props.isMobile ? "0.8rem" : "16px")};
  color: #666666;
  margin: 0;
  line-height: 20px;
`;

const flavorInfo = {
  smoky: "탄 향과 연기 맛이 나며, 호불호가 갈릴 수 있습니다.",
  peaty: "모래나 흙을 떠올리게 하는 맛으로, 강렬한 느낌을 주며 호불호가 강하게 작용합니다.",
  spicy: "생강, 계피, 정향 등의 향신료 맛과 향을 의미합니다.",
  herbal: "풀 향이 나며, 편안하고 상쾌한 맛과 향을 의미합니다.",
  oily: "부드러운 느낌의 맛과 향입니다.",
  body: "맛이 강하고 진하며, 입안에 오래 남는 느낌을 줄 수 있습니다.",
  rich: "다양한 향과 맛이 복합적으로 작용하여 풍부한 느낌을 줍니다.",
  sweet: "달콤한 맛이 강하며, 카라멜과 유사한 느낌을 줍니다.",
  salty: "해안가 증류소에서 숙성한 위스키의 특징적인 맛이며, 염분기를 포함하고 있습니다.",
  vanilla: "달콤하고 부드러운 맛과 향입니다.",
  tart: "레몬과 라임같은 산미가 느껴지는 맛입니다.",
  fruity: "사과, 배, 체리 등의 과일 풍미가 느껴지는 맛입니다.",
  floral: "부드러우면서 향기로운 맛으로 라벤더나 장미와 같은 꽃의 향이 느껴집니다.",
};

const QuestionChooseFlavorItem = (props) => {
  const isMobile = props.isMobile;
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);
  const [isHover, setIsHover] = useState(false);

  const preferFlavor = props.flavor;
  const onClickHandler = () => {
    setPreferenceValue((prev) => {
      return {
        ...prev,
        flavor: {
          ...prev.flavor,
          [preferFlavor]: prev.flavor[preferFlavor] + 25 > 100 ? 0 : prev.flavor[preferFlavor] + 25,
        },
      };
    });
    if (isMobile) {
      setIsHover(true);
      setTimeout(() => {
        setIsHover(false);
      }, 1000);
    }
  };

  return (
    <SWrap>
      <SCard
        isMobile={isMobile}
        onClick={onClickHandler}
        shadowLevel={preferenceValue.flavor[props.flavor] * 0.01}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <SBalloon isMobile={isMobile} isHover={isHover}>
          <SBalloonText isMobile={isMobile}>{flavorInfo[props.flavor]}</SBalloonText>
        </SBalloon>
        <SImg
          isMobile={isMobile}
          src={require(`../../../assets/img/flavor/${preferFlavor}.png`)}
          alt={preferFlavor}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        />
        {preferenceValue.flavor[props.flavor] !== 0 ? (
          <SFront
            isMobile={isMobile}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {preferenceValue.flavor[props.flavor]}%
          </SFront>
        ) : (
          ""
        )}
      </SCard>
      <SName>{props.flavor}</SName>
    </SWrap>
  );
};

export default QuestionChooseFlavorItem;

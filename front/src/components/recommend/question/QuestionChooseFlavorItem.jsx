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
//   background: ;
//   box-shadow: ;
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
  const onClickHandler = () => {
    const preferFlavor = props.flavor;
    props.setSelectedFlavor((prevData) => {
      return {
        ...prevData,
        preferFlavor:
          prevData[preferFlavor] + 25 ? prevData[preferFlavor] + 25 < 100 : 0,
      };
    });
    console.log(props.selectedFlavor);
  };

  return (
    <SWrap>
      <SCard onClick={onClickHandler}>
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

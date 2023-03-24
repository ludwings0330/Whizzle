import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { motion } from "framer-motion";
import mainImg from "../../assets/img/main.png";
import "./MainDefault.css";

const SImg = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background: url(${mainImg}) center center / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SBlock = styled.div`
  width: 350px;
`;

const SContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SLight = styled.span`
  font-family: GmarketSansLight;
  font-size: 48px;
  letter-spacing: -2px;
  color: white;
`;

const SStrong = styled.span`
  font-family: GmarketSansBold;
  font-size: 48px;
  letter-spacing: -2px;
  color: white;
`;

// const SButton = styled.button`
//   cursor: pointer;
//   display: block;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   width: 275px;
//   height: 74px;
//   border: none;
//   border-radius: 999px;
//   background: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
// `;

const SButtonText = styled.span`
  font-size: 20px;
  font-family: "Pretendard Variable";
  color: white;
  z-index: 2;
`;

const MainDefault = (props) => {
  const navigate = useNavigate();

  const goRecommend = () => {
    navigate(`/recommend/question`);
  };

  return (
    <>
      <SImg>
        <SBlock></SBlock>
        <SContent>
          <motion.div
            variants={props.variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SLight>위스키를 즐겁게!</SLight>
            <br />
            <SStrong>맛의 경계를 넘어, 더 깊은 취향 속으로</SStrong>
          </motion.div>
          <motion.div
            variants={props.variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* <SButton onClick={goRecommend}>
              <SButtonText>나만의 위스키 추천받기</SButtonText>
            </SButton> */}
            <div className="container container-two" onClick={goRecommend}>
              <button className="selected-button">
                <SButtonText>나만의 위스키 추천받기</SButtonText>
                <div className="fill-two"></div>
              </button>
            </div>
          </motion.div>
        </SContent>
      </SImg>
    </>
  );
};

export default MainDefault;

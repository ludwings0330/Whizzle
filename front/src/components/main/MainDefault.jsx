import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { motion } from "framer-motion";
import mainImg from "../../assets/img/main.png";
import mobileImg from "../../assets/img/mobile_main.png";
import styles from "./MainDefault.module.css";

const SImg = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background: url(${mainImg}) center center / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    background: url(${mobileImg}) center center / cover no-repeat;
    height: 85vh;
  }
`;

const SContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 33vh;
  @media screen and (max-width: 1000px) {
    margin-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SLight = styled.span`
  font-family: GmarketSansLight;
  font-size: 5vh;
  letter-spacing: -2px;
  color: white;
  @media screen and (max-width: 1119px) {
    font-size: 4.5vw;
  }
`;

const SStrong = styled.span`
  font-family: GmarketSansBold;
  font-size: 5vh;
  letter-spacing: -2px;
  color: white;
  @media screen and (max-width: 1119px) {
    font-size: 4.5vw;
  }
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
  font-size: 18px;
  font-family: "Pretendard Variable";
  color: white;
  z-index: 2;
  @media screen and (max-width: 1119px) {
    font-size: 2.5vw;
  }
`;

const MainDefault = (props) => {
  const navigate = useNavigate();

  const goRecommend = () => {
    navigate(`/recommend/question`);
  };

  return (
    <>
      <SImg>
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
            <div className={`${styles.container} ${styles.containerTwo}`} onClick={goRecommend}>
              <button className={styles.selectedButton}>
                <SButtonText>나만의 위스키 추천받기</SButtonText>
                <div className={styles.fillTwo}></div>
              </button>
            </div>
          </motion.div>
        </SContent>
      </SImg>
    </>
  );
};

export default MainDefault;

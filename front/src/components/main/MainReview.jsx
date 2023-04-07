import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import styles from "./MainReview.module.css";
import { v4 as uuidv4 } from "uuid";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-image: linear-gradient(90deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
  @media screen and (max-width: 800px) {
    height: 65vh;
  }
`;

const SText = styled.div`
  text-align: end;
  width: 58%;
  display: flex;
  align-items: end;
  flex-direction: column;
  @media screen and (max-width: 1244px) {
    width: 90%;
  }
`;

const SLight = styled.span`
  font-family: GmarketSansLight;
  font-size: 4.5vh;
  padding-left: 10px;
  letter-spacing: -2px;
  color: white;
  @media screen and (max-width: 1000px) {
    font-size: 4.5vw;
  }
`;

const SReviewBox = styled.div`
  display: flex;
  margin-top: 60px;
  gap: 30px;
`;

const SImg = styled.img`
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  @media screen and (max-width: 1000px) {
    border-radius: 8px;
    box-shadow: none;
  }
`;

const SSecond = styled.div`
  margin-left: 30px;
  @media screen and (max-width: 1000px) {
    margin-left: 10px;
  }
`;

const reviewList = [1, 2, 3, 4, 5, 6];

const MainReview = (props) => {
  return (
    <SDiv>
      <SText>
        <motion.div
          variants={props.variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SLight>위즐을 먼저 경험해 본</SLight>
          <br />
          <SLight>
            <span style={{ fontFamily: "GmarketSansBold" }}>다른 위즐리들의 후기</span>를
            확인하세요!
          </SLight>
        </motion.div>
      </SText>
      <motion.div
        variants={props.variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <div className={styles.slideContainer}>
            {/* <SReviewBox className={styles.slideContainer}> */}
            {reviewList.map((review, index) => {
              return (
                <>
                  {index % 2 ? (
                    <SImg
                      className={styles.slideImage}
                      key={uuidv4()}
                      src={require(`../../assets/img/review${review}.png`)}
                      style={{ marginTop: "50px" }}
                    />
                  ) : (
                    <SImg
                      className={styles.slideImage}
                      key={uuidv4()}
                      src={require(`../../assets/img/review${review}.png`)}
                    />
                  )}
                </>
              );
            })}
            {/* </SReviewBox> */}
          </div>
          <SSecond className={styles.slideContainer}>
            {/* <SReviewBox className={styles.slideContainer}> */}
            {reviewList.map((review, index) => {
              return (
                <>
                  {index % 2 ? (
                    <SImg
                      className={styles.slideImage}
                      key={uuidv4()}
                      src={require(`../../assets/img/review${review}.png`)}
                      style={{ marginTop: "50px" }}
                    />
                  ) : (
                    <SImg
                      className={styles.slideImage}
                      key={uuidv4()}
                      src={require(`../../assets/img/review${review}.png`)}
                    />
                  )}
                </>
              );
            })}
            {/* </SReviewBox> */}
          </SSecond>
        </div>
      </motion.div>
    </SDiv>
  );
};

export default MainReview;

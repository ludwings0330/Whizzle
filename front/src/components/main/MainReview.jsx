import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import MainReviewItem from "./MainReviewItem";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-image: linear-gradient(
    90deg,
    #f84f5a 28.12%,
    #f7875a 65.62%,
    #f7cb5a 100%
  );
`;

const SText = styled.div`
  text-align: end;
  width: 58%;
  display: flex;
  align-items: end;
  flex-direction: column;
`;

const SLight = styled.span`
  font-family: GmarketSansLight;
  font-size: 40px;
  padding-left: 10px;
  letter-spacing: -2px;
  color: white;
`;

const SReviewBox = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 60px;
`;

const SReview = styled.div`
  width: 297px;
  height: 366px;
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
`;

const reviewList = [0, 1, 2, 3, 4];

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
            <span style={{ fontFamily: "GmarketSansBold" }}>
              다른 위즐리들의 후기
            </span>
            를 확인하세요!
          </SLight>
        </motion.div>
      </SText>
      <motion.div
        variants={props.variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SReviewBox>
          {reviewList.map((review, index) => {
            if (index % 2) {
              return (
                <SReview key={index} style={{ marginTop: "40px" }}></SReview>
              );
            } else {
              return <SReview key={index}></SReview>;
            }
          })}
        </SReviewBox>
      </motion.div>
    </SDiv>
  );
};

export default MainReview;

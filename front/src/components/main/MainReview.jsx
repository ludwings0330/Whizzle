import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import "./MainReview.css";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-image: linear-gradient(90deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
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
  font-size: 4.5vh;
  padding-left: 10px;
  letter-spacing: -2px;
  color: white;
`;

const SReviewBox = styled.div`
  display: flex;
  margin-top: 60px;
  gap: 30px;
`;

const SImg = styled.img`
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
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
        <SReviewBox className="slide-container">
          {reviewList.map((review, index) => {
            return (
              <>
                {index % 2 ? (
                  <SImg
                    key={review}
                    src={require(`../../assets/img/review${review}.png`)}
                    style={{ marginTop: "40px" }}
                  />
                ) : (
                  <SImg key={review} src={require(`../../assets/img/review${review}.png`)} />
                )}
              </>
            );
          })}
        </SReviewBox>
      </motion.div>
    </SDiv>
  );
};

export default MainReview;

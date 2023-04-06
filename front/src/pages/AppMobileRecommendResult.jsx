import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { NON_LOGIN_NICKNAME } from "../constants/constants";
import { preference, recommendResult } from "../store/indexStore";

//import components
import MobileGraph from "../components/common/MobileGraph";
import MobileResultMainWhisky from "../components/recommend/mobileResult/MobileResultMainWhisky";
import MobileResultWhiskyList from "../components/recommend/mobileResult/MobileResultWhiskyList";
import Swal from "sweetalert2";

const SHeader = styled.div`
  width: 100%;
  max-width: 120%;
  height: 50vh;
  background: linear-gradient(108.47deg, #f84f5a 33.1%, #f7cb5a 92.59%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 412px) {
    max-width: 140%;
  }

  @media (max-width: 375px) {
    max-width: 150%;
  }

  @media (max-width: 360px) {
    max-width: 120%;
  }
`;

const SP = styled.p`
  font-size: 1.3em;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & span {
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
  }
`;

const SGraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vh;

  @media (max-width: 414px) {
    margin-top: 2vh;
  }

  @media (max-width: 360px) {
    margin-top: 1vh;
  }

  @media (max-width: 375px) {
    margin-top: 2vh;
  }
`;

const SGraphP = styled.p`
  display: inline-block;
  font-size: 1.3em;
  text-align: center;

  @media (max-width: 414px) {
    font-size: 1.1em;
  }

  @media (max-width: 360px) {
    font-size: 0.9em;
  }

  @media (max-width: 375px) {
    font-size: 1em;
  }
`;

const SColorSpan = styled.span`
  background: linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 700;

  @media (max-width: 412px) {
    font-size: 20px;
  }

  @media (max-width: 360px) {
    font-size: 18px;
  }

  @media (max-width: 375px) {
    font-size: 19px;
  }
`;

const SSpan = styled.span`
  font-weight: 400;
  color: #a3a3a3;
`;

const STitleP = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 40vw;
  height: 7vh;
  color: #ffffff;
  font-size: 1.25em;
  margin-bottom: 2vh;

  background: #f84f5a;
  border-radius: 999px;

  @media (max-width: 767px) {
    width: 60%;
    max-width: 100%;
  }
`;

const SBoldColorP = styled.p`
  background: linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 700;
  font-size: 1.7em;
  margin-bottom: 3vh;
  margin-top: 3vh;

  @media (max-width: 414px) {
    font-size: 1.3em;
  }

  @media (max-width: 360px) {
    font-size: 1.1em;
  }
`;

const SBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 768px;
    margin: 3vh auto 0;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
  }
`;

const SQuestionBtn = styled.button`
  width: 40vw;
  height: 13vw;
  margin-right: 30px;
  margin-bottom: 20vh;
  border: 3px solid transparent;
  border-radius: 999px;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #fff inset;
  cursor: pointer;
  font-family: "Pretendard Variable";
`;

const SDailyBtn = styled.button`
  width: 40vw;
  height: 13vw;
  border: 1px solid transparent;
  font-family: "Pretendard Variable";
  background: linear-gradient(106.95deg, #f84f5a 11.68%, #f2a660 86.99%);
  border-radius: 999px;
  font-size: 0.8rem;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
  margin-right: 30px;
  margin-bottom: 20vh;
`;

const SDailyPlusBtn = styled.button`
  width: 40vw;
  height: 13vw;
  border: 1px solid transparent;
  font-family: "Pretendard Variable";
  background: linear-gradient(106.95deg, #f84f5a 11.68%, #f2a660 86.99%);
  border-radius: 999px;
  font-size: 0.65rem;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
  margin-right: 30px;
  margin-bottom: 20vh;
`;

//추천 결과 페이지
const AppMobileRecommnedResult = () => {
  const [recommend, setRecommend] = useRecoilState(recommendResult);
  const userPreference = useRecoilValue(preference);
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);

  const navigate = useNavigate();
  const onClickHandler = (e) => {
    if (e.target.innerText === "취향 정보 다시 입력하기") {
      setRecommend((prev) => []);
      navigate("/recommend/question");
    } else if (e.target.innerText === "데일리 위스키 추천받기") {
      navigate("/daily");
    }
  };

  const goSignin = () => {
    navigate("/signin");
  };

  // 비로그인 유저의 경우 회원가입 유도 모달을 띄움
  useEffect(() => {
    if (!isLogin) {
      setTimeout(() => {
        Swal.fire({
          title: "회원 가입을 통해 \n취향을 저장해보세요!",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "로그인",
          cancelButtonText: "취소",
          customClass: {
            container: "my-swal-container",
            confirmButton: "my-swal-confirm-button",
            cancelButton: "my-swal-cancel-button",
            icon: "my-swal-icon",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signin");
          }
        });
      }, 5000);
    }
  }, []);

  // 가장 큰 2개의 값을 찾음
  const [maxValue, setMaxValue] = useState([]);
  const flavor = userPreference.flavor;

  useEffect(() => {
    const flavorEntries = Object.entries(flavor);
    flavorEntries.sort((a, b) => b[1] - a[1]);
    const maxValues = flavorEntries.slice(0, 2).map(([key, value]) => key.toUpperCase());
    setMaxValue(maxValues);
  }, []);

  return (
    <>
      <SHeader>
        <SP
          style={{
            fontSize: "1.6rem",
            marginBottom: "0px",
            fontWeight: "bold",
          }}
        >
          나만의 취향 찾기, 위스키 추천
        </SP>
        <SP>
          <span>넘쳐나는 위스키 바다 속</span>
          <span>오직 나만을 위한 추천 결과를 확인해보세요</span>
        </SP>
      </SHeader>
      <SGraphDiv>
        <STitleP>취향 분석 결과</STitleP>
        <SGraphP>
          <SColorSpan>{user.nickname ? user.nickname : NON_LOGIN_NICKNAME}</SColorSpan>
          <SSpan>님의 취향분석 결과입니다.</SSpan>
        </SGraphP>
        <SBoldColorP>
          {maxValue[0]} & {maxValue[1]}
        </SBoldColorP>
        <MobileGraph flavor={flavor} />
      </SGraphDiv>
      {recommend && recommend.length && (
        <MobileResultMainWhisky
          whiskys={recommend.slice(0, 3)}
          SGraphP={SGraphP}
          SColorSpan={SColorSpan}
          SSpan={SSpan}
          STitleP={STitleP}
        />
      )}
      {recommend && recommend.length && <MobileResultWhiskyList whiskys={recommend.slice(3)} />}
      <SBtnDiv>
        <SQuestionBtn onClick={onClickHandler}>
          <SColorSpan style={{ fontSize: "0.8rem" }}>취향 정보 다시 입력하기</SColorSpan>
        </SQuestionBtn>
        {isLogin ? (
          <SDailyBtn onClick={onClickHandler}>데일리 위스키 추천받기</SDailyBtn>
        ) : (
          <SDailyPlusBtn onClick={goSignin}>회원가입하고 더 많은 추천받기</SDailyPlusBtn>
        )}
      </SBtnDiv>
    </>
  );
};

export default AppMobileRecommnedResult;

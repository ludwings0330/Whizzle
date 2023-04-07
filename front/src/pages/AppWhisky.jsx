import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import favoriteFilled from "../assets/img/favorite_white_filled.png";
import favoriteBorder from "../assets/img/favorite_white_border.png";
import create from "../assets/img/create.png";
import styled from "styled-components";
import { getKeep, getSimilar, getStatistics, keepToggle, whiskyDetail } from "../apis/whiskyDetail";
import { userState } from "../store/userStore";
import { useRecoilValue } from "recoil";
import { changeHeader, rollbackHeader } from "../hooks/changeHeader";
import Swal from "sweetalert2";
import { showAllState } from "../store/indexStore";
import { motion } from "framer-motion";

//import components
import WhiskyDetailInfo from "../components/whisky/WhiskyDetailInfo";
import WhiskyDetailReview from "../components/whisky/WhiskyDetailReview";
import WhiskySimilarList from "../components/whisky/WhiskySimilarList";
import Graph from "../components/common/Graph";

const SButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;

  border-radius: 999%;
  border: none;
  cursor: pointer;

  background: #f84f5a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SButtonDiv = styled.div`
  z-index: 100;
  position: sticky;
  left: 76vw;
  bottom: 60px;
  width: 63px;
  height: 120px;
`;

const SImg = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const SP = styled.p`
  font-size: 22px;
  font-weight: 600;
  color: #363636;
`;

const SContainer = styled.div`
  margin-top: 70px;
  max-width: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const AppWhisky = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  const showAll = useRecoilValue(showAllState);
  useEffect(() => {
    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, [showAll]);

  // 리뷰페이지에서 왔다면, review 창으로 보냄
  const reviewRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const toReview = params.get("review");

    if (toReview === "true") {
      setTimeout(() => {
        reviewRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
      }, 500);
    }
  }, [location.search]);

  // 위스키 정보 조회
  const [whisky, setWhisky] = useState(null);

  async function getWhiskyInfo(param) {
    try {
      const whiskyInfo = await whiskyDetail(param);
      setWhisky(whiskyInfo);
    } catch (error) {}
  }

  // 킵 여부 조회
  async function getKeepInfo(param) {
    try {
      const keepInfo = await getKeep(param);
      setIsKeep(keepInfo);
    } catch (error) {}
  }

  // 선호 통계 조회
  const [stat, setStat] = useState(null);

  async function getStatisticsInfo(param) {
    try {
      const statInfo = await getStatistics(param);
      if (statInfo) {
        statInfo.age =
          statInfo.age === "TWENTY"
            ? "20"
            : statInfo.age === "THIRTY"
            ? "30"
            : statInfo.age === "FORTY"
            ? "40"
            : statInfo.age === "FIFTY"
            ? "50"
            : "60";
        statInfo.gender = statInfo.gender === "MALE" ? "남성" : "여성";
      }
      setStat(statInfo);
    } catch (error) {}
  }

  // 유사 위스키 조회
  const [similarWhiskys, setSimilarWhiskys] = useState([]);

  async function getSimilarInfo(param) {
    try {
      const similarInfo = await getSimilar(param);
      setSimilarWhiskys(similarInfo);
    } catch (error) {}
  }

  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);
  const [isKeep, setIsKeep] = useState(false);

  useEffect(() => {
    // 위스키 상세 조회 요청
    getWhiskyInfo(id);
    // 유사 위스키 목록 요청
    getSimilarInfo(id);
    // 통계 정보 요청
    getStatisticsInfo(id);

    if (isLogin) {
      // 킵 여부 조회 요청
      getKeepInfo(id);
    }
    window.scrollTo(0, 0);
  }, [id]);

  const favorite = () => {
    if (isLogin) {
      setIsKeep(!isKeep);
      keepToggle(id);
    } else {
      Swal.fire({
        title: "로그인이 필요한 기능입니다. \n로그인 하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
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
    }
  };

  const createReview = () => {
    if (isLogin) {
      navigate(`/review/${id}`);
    } else {
      Swal.fire({
        title: "로그인이 필요한 기능입니다. \n로그인 하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
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
    }
  };

  return (
    <>
      <SContainer>
        {whisky && <WhiskyDetailInfo whisky={whisky} stat={stat} />}
        <div style={{ width: "830px", marginBottom: "0px", marginTop: "50px" }}>
          <SP>이 위스키는 이런 맛을 가지고 있어요!</SP>
        </div>
        {whisky && <Graph flavor={whisky.flavor} />}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "830px",
            marginBottom: "0px",
            marginTop: "90px",
          }}
        >
          <SP style={{ marginRight: "30px" }}>이런 위스키는 어떠세요?</SP>
          <p>오른쪽으로 스와이프해서 더 많은 위스키를 알아보세요!</p>
        </div>
        {similarWhiskys?.length ? <WhiskySimilarList whiskys={similarWhiskys} /> : null}
        <WhiskyDetailReview ref={reviewRef} id={id} whisky={whisky} />
        <SButtonDiv>
          <SButton onClick={favorite} style={{ paddingTop: "6px", marginBottom: "10px" }}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <SImg src={isKeep ? favoriteFilled : favoriteBorder} alt="keep" />
            </motion.div>
          </SButton>
          <SButton onClick={createReview}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <SImg src={create} alt="create" />
            </motion.div>
          </SButton>
        </SButtonDiv>
      </SContainer>
    </>
  );
};

export default AppWhisky;

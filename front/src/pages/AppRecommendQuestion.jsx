import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { preference, recommendResult, isMobileState } from "../store/indexStore";
import { userState } from "../store/userStore";
import { preferenceSave, recommend } from "../apis/recommend";
import { getPreference } from "../apis/userinfo";
import presetWisky from "../constants/presetWhisky";
import { whiskyDetail } from "../apis/whiskyDetail";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import navigateNext from "../assets/img/navigate_next.png";
import navigatePrev from "../assets/img/navigate_prev.png";
import { error, warning } from "../components/notify/notify";

//components import
import QuestionStart from "../components/recommend/question/QuestionStart";
import QuestionFilter from "../components/recommend/question/QuestionFilter";
import QuestionExperience from "../components/recommend/question/QuestionExperience";
import QuestionPrice from "../components/recommend/question/QuestionPrice";
import QuestionChooseWhisky from "../components/recommend/question/QuestionChooseWhisky";
import QuestionChooseFlavor from "../components/recommend/question/QuestionChooseFlavor";
import QuestionLoading from "../components/recommend/question/QuestionLoading";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-image: linear-gradient(90deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
`;

const slider = {
  display: "flex",
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const mobileSlider = {
  display: "flex",
  minHeight: "80vh",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const SPrevNavigate = styled.div`
  cursor: pointer;
  position: fixed;
  top: 43.25%;
  left: 0%;
  display: ${(props) =>
    props.activePage === 0 || props.activePage === 1 || props.activePage === 6 ? "none" : ""};
`;

const SNextNavigate = styled.div`
  cursor: pointer;
  position: fixed;
  top: 43.25%;
  right: 0%;
  display: ${(props) =>
    props.activePage === 0 ||
    props.activePage === 4 ||
    props.activePage === 5 ||
    props.activePage === 6
      ? "none"
      : ""};
`;

const ProgressBar = styled(motion.div)`
  height: 6px;
  width: ${(props) => props.width}%;
  background-color: #ffffff;
  position: absolute;
  top: 70px;
  left: 0;
  z-index: 9999;
  border-radius: 999px;
`;

const animatePath = keyframes`
  0% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 52.417038818275515,195.67777396083818 104.83407763655103,191.3555479216764 170,177 C 235.16592236344897,162.6444520783236 313.08072827207144,138.25558227413262 393,167 C 472.91927172792856,195.74441772586738 554.8430092751631,277.62212298179315 629,267 C 703.1569907248369,256.37787701820685 769.547234627276,153.25592579869465 826,126 C 882.452765372724,98.74407420130537 928.9680522157335,147.35417382342837 991,164 C 1053.0319477842665,180.64582617657163 1130.5805565097903,165.32737890759188 1208,166 C 1285.4194434902097,166.67262109240812 1362.7097217451048,183.33631054620406 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  25% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 59.68601855032637,162.63483339058743 119.37203710065273,125.26966678117486 190,140 C 260.62796289934727,154.73033321882514 342.19787014771543,221.55616626588804 410,227 C 477.80212985228457,232.44383373411196 531.8364823084852,176.5056681552731 602,169 C 672.1635176915148,161.4943318447269 758.4562006183443,202.4211611130196 838,213 C 917.5437993816557,223.5788388869804 990.3387152181381,203.80968739264858 1054,204 C 1117.661284781862,204.19031260735142 1172.1889385091033,224.34008931638613 1235,227 C 1297.8110614908967,229.65991068361387 1368.9055307454482,214.82995534180694 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  50% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 72.19787014771558,206.1614565441429 144.39574029543115,212.32291308828582 206,221 C 267.60425970456885,229.67708691171418 318.61490896599105,240.86980419099964 387,244 C 455.38509103400895,247.13019580900036 541.1446238406047,242.19787014771555 609,219 C 676.8553761593953,195.80212985228445 726.8065956715906,154.33871521813808 805,132 C 883.1934043284094,109.66128478186191 989.6289934730332,106.44726897973206 1061,128 C 1132.3710065269668,149.55273102026794 1168.677430436276,195.8722088629337 1226,212 C 1283.322569563724,228.1277911370663 1361.661284781862,214.06389556853316 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  75% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 62.23222260391617,212.31879079354172 124.46444520783234,224.63758158708347 201,212 C 277.53555479216766,199.36241841291653 368.3744417725868,161.76846444520785 446,168 C 523.6255582274132,174.23153555479215 588.0377877018205,224.2885606320852 644,228 C 699.9622122981795,231.7114393679148 747.4744074201305,189.0772930264514 800,194 C 852.5255925798695,198.9227069735486 910.0645826176572,251.40226726210926 991,244 C 1071.9354173823428,236.59773273789074 1176.2672621092408,169.31363792511164 1255,152 C 1333.7327378907592,134.68636207488836 1386.8663689453797,167.3431810374442 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  100% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 52.417038818275515,195.67777396083818 104.83407763655103,191.3555479216764 170,177 C 235.16592236344897,162.6444520783236 313.08072827207144,138.25558227413262 393,167 C 472.91927172792856,195.74441772586738 554.8430092751631,277.62212298179315 629,267 C 703.1569907248369,256.37787701820685 769.547234627276,153.25592579869465 826,126 C 882.452765372724,98.74407420130537 928.9680522157335,147.35417382342837 991,164 C 1053.0319477842665,180.64582617657163 1130.5805565097903,165.32737890759188 1208,166 C 1285.4194434902097,166.67262109240812 1362.7097217451048,183.33631054620406 1440,200 C 1440,200 1440,400 1440,400 Z");
`;

const Svg = styled.svg`
  z-index: 0;
  height: ${(props) => (props.isMobile ? "5%" : "15%")};
  width: 100%;
  transition: all 300ms ease-in-out 150ms;

  .path-0 {
    animation: ${animatePath} 4s linear infinite;
  }
`;

const SMobilePrevBtn = styled.button`
  display: ${(props) =>
    props.activePage === 0 ||
    props.activePage === 1 ||
    props.activePage === 4 ||
    props.activePage === 5 ||
    props.activePage === 6
      ? "none"
      : ""};
  width: 40vw;
  height: 12vw;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  background: white;
  position: absolute;
  bottom: 6vh;
  left: 6vw;
`;

const SMobileNextBtn = styled.button`
  display: ${(props) =>
    props.activePage === 0 ||
    props.activePage === 4 ||
    props.activePage === 5 ||
    props.activePage === 6
      ? "none"
      : ""};
  width: 40vw;
  height: 12vw;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  background: white;
  position: absolute;
  bottom: 6vh;
  left: 6vw;
`;

const SButtonText = styled.span`
  font-size: 18px;
  font-family: "Pretendard Variable";
  font-weight: bold;
  background-image: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AppRecommendQuestion = (props) => {
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);
  const navigate = useNavigate();
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);
  const [resultValue, setResultValue] = useRecoilState(recommendResult);
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState("next");
  const [barWidth, setBarWidth] = useState(0);

  // mobile 여부를 확인
  const isMobile = useRecoilValue(isMobileState);

  const goResult = async () => {
    setActivePage(6);

    // 위스키 추천 요청
    const recommendData = {
      priceTier: preferenceValue.priceTier,
      flavor: preferenceValue.flavor,
    };

    await recommend(recommendData)
      .then((data) => {
        setResultValue(data);
      })
      .catch((e) => e);

    setPreferenceValue((prev) => {
      return { ...prev, saved: true, re: false };
    });

    setTimeout(() => {
      navigate(`/recommend/result`);
    }, 2000);
  };

  const flavorSubmitHandler = async () => {
    setDirection("next");
    setActivePage(6);

    // 백에 취향정보 저장
    const saveData = {
      gender: preferenceValue.gender,
      age: preferenceValue.age,
      priceTier: preferenceValue.priceTier,
      flavor: preferenceValue.flavor,
    };

    if (isLogin) {
      try {
        await preferenceSave(saveData);
      } catch {}
    }

    // 위스키 추천 요청
    const recommendData = {
      priceTier: preferenceValue.priceTier,
      flavor: preferenceValue.flavor,
    };

    try {
      let recommendedResult;
      recommendedResult = await recommend(recommendData);
      setResultValue(recommendedResult);
    } catch {}

    setPreferenceValue((prev) => {
      return { ...prev, saved: true, re: false };
    });

    setTimeout(() => {
      navigate(`/recommend/result`);
    }, 2000);
  };

  const whiskySubmitHandler = async () => {
    if (preferenceValue.whiskies.length > 0) {
      setDirection("next");
      setActivePage(6);

      // 위스키 추천 요청
      const recommendData = {
        priceTier: preferenceValue.priceTier,
        whiskies: [preferenceValue.whiskies[0]],
      };

      try {
        let recommendedResult;
        recommendedResult = await recommend(recommendData);
        setResultValue(recommendedResult);
      } catch {}

      // 선택된 위스키로 flavor 가져와서 저장
      let selectedWhiskyFlavor;
      try {
        const selectedWhisky = await whiskyDetail(presetWisky[preferenceValue.whiskies[0]].id);
        selectedWhiskyFlavor = selectedWhisky.flavor;
        setPreferenceValue((prev) => {
          return { ...prev, flavor: selectedWhiskyFlavor };
        });
      } catch {}

      // 백에 취향정보 저장
      const saveData = {
        gender: preferenceValue.gender,
        age: preferenceValue.age,
        priceTier: preferenceValue.priceTier,
        flavor: selectedWhiskyFlavor,
      };

      if (isLogin) {
        try {
          await preferenceSave(saveData);
        } catch {}
      }

      setPreferenceValue((prev) => {
        return { ...prev, saved: true, re: false };
      });

      setTimeout(() => {
        navigate(`/recommend/result`);
      }, 2000);
    } else {
      warning("1개 이상의 위스키를 선택해주세요!");
    }
  };

  useEffect(() => {
    if (preferenceValue.saved === true) {
      goResult();
    } else if (user?.id && !preferenceValue.re) {
      getPreference(user.id).then((response) => {
        setPreferenceValue((prev) => {
          return { ...prev, ...response.data, re: false };
        });
        goResult();
      });
    }
  }, []);

  useEffect(() => {
    const footer = document.getElementById("footer");
    footer.style.display = "none";

    return () => {
      footer.style.display = "flex";
    };
  });

  const goNextPage = () => {
    if (activePage === 1 && !(preferenceValue.age && preferenceValue.gender)) {
      error("나이, 성별을 선택해주세요!");
    } else if (activePage === 2 && !preferenceValue.priceTier) {
      error("선호 가격대를 선택해주세요!");
    } else if (activePage === 3 && !preferenceValue.isExperience) {
      error("위스키 경험을 선택해주세요!");
    } else if (activePage === 3 && preferenceValue.isExperience === "true") {
      setDirection("next");
      setActivePage(4);
    } else if (activePage === 3 && preferenceValue.isExperience === "false") {
      setPreferenceValue((prev) => {
        return {
          ...prev,
          flavor: {
            smoky: 0,
            peaty: 0,
            spicy: 0,
            herbal: 0,
            oily: 0,
            body: 0,
            rich: 0,
            sweet: 0,
            salty: 0,
            vanilla: 0,
            tart: 0,
            fruity: 0,
            floral: 0,
          },
        };
      });
      setDirection("next");
      setActivePage(5);
    } else if (activePage === 4 && preferenceValue.whiskies == []) {
      error("1개 이상의 위스키를 선택해주세요!");
    } else {
      setDirection("next");
      setActivePage((prev) => (activePage === 4 ? prev + 2 : prev + 1));
    }
  };
  const goPrevPage = () => {
    setDirection("prev");
    setActivePage((prev) => (activePage === 5 ? prev - 2 : prev - 1));
  };

  const pageVariants = {
    hidden: function (direction) {
      return {
        x: direction === "next" ? 500 : -500,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.75 },
      };
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.75, delay: 0.75 },
    },
    exit: function (direction) {
      return {
        x: direction === "next" ? -500 : 500,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.75 },
      };
    },
  };

  const recommendQuestionPages = () => {
    switch (activePage) {
      case 0:
        return <QuestionStart isMobile={isMobile} goNextPage={goNextPage} />;
      case 1:
        return (
          <QuestionFilter
            isMobile={isMobile}
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
            setBarWidth={setBarWidth}
          />
        );
      case 2:
        return (
          <QuestionPrice
            isMobile={isMobile}
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
            setBarWidth={setBarWidth}
          />
        );
      case 3:
        return (
          <QuestionExperience
            isMobile={isMobile}
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
            setBarWidth={setBarWidth}
          />
        );
      case 4:
        return (
          <QuestionChooseWhisky
            isMobile={isMobile}
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
            setBarWidth={setBarWidth}
            whiskySubmitHandler={whiskySubmitHandler}
          />
        );
      case 5:
        return (
          <QuestionChooseFlavor
            isMobile={isMobile}
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
            setBarWidth={setBarWidth}
            flavorSubmitHandler={flavorSubmitHandler}
          />
        );
      case 6:
        return (
          <QuestionLoading
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
            barWidth={barWidth}
            setBarWidth={setBarWidth}
          />
        );
    }
  };

  return (
    <SDiv>
      <ProgressBar
        initial={{ width: 0 }}
        animate={{ width: barWidth }}
        transition={{ duration: 0.75, delay: 0.75 }}
      />
      <motion.div style={isMobile ? mobileSlider : slider}>
        <AnimatePresence custom={direction}>{recommendQuestionPages()}</AnimatePresence>
      </motion.div>
      {isMobile ? null : (
        <SPrevNavigate activePage={activePage} onClick={goPrevPage}>
          <img src={navigatePrev} alt="navigate" />
        </SPrevNavigate>
      )}
      {isMobile ? null : (
        <SNextNavigate activePage={activePage} onClick={goNextPage}>
          <img src={navigateNext} alt="navigate" />
        </SNextNavigate>
      )}
      {activePage === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            width="100%"
            height="15%"
            id="svg"
            viewBox="0 0 1440 390"
            xmlns="http://www.w3.org/2000/svg"
            className="transition duration-300 ease-in-out delay-150"
            style={{ position: "fixed", bottom: 0, left: 0 }}
            preserveAspectRatio="none"
          >
            <path
              d="M 0,400 C 0,400 0,200 0,200 C 43.02759896411395,177.39228018251328 86.0551979282279,154.78456036502652 142,171 C 197.9448020717721,187.21543963497348 266.8068072512024,242.2540387224072 332,258 C 397.1931927487976,273.7459612775928 458.7175730669627,250.19928474534467 500,222 C 541.2824269330373,193.80071525465533 562.322900480947,160.94882229621408 613,136 C 663.677099519053,111.05117770378592 743.9908250092491,94.00542606979903 800,125 C 856.0091749907509,155.99457393020097 887.7137994820569,235.02947342458995 943,244 C 998.2862005179431,252.97052657541005 1077.1539770625232,191.87668023184114 1143,179 C 1208.8460229374768,166.12331976815886 1261.6702922678505,201.46380564804537 1309,213 C 1356.3297077321495,224.53619435195463 1398.1648538660747,212.26809717597732 1440,200 C 1440,200 1440,400 1440,400 Z"
              stroke="none"
              strokeWidth="0"
              fill="#ffffff"
              fillOpacity="1"
              className="transition-all duration-300 ease-in-out delay-150 path-0"
            ></path>
          </svg>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Svg
            isMobile={isMobile}
            id="svg"
            viewBox="0 0 1440 390"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "fixed", bottom: 0, left: 0 }}
            preserveAspectRatio="none"
          >
            <path
              d="M 0,400 C 0,400 0,200 0,200 C 52.417038818275515,195.67777396083818 1362.7097217451048,183.33631054620406 1440,200 C 1440,200 1440,400 1440,400 Z"
              stroke="none"
              strokeWidth="0"
              fill="#ffffff"
              fillOpacity="1"
              className="path-0"
            ></path>
          </Svg>
        </motion.div>
      )}
    </SDiv>
  );
};

export default AppRecommendQuestion;

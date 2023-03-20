import React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

//components import
import Main from "../components/main/Main";
import MainDiary from "../components/main/MainDiary";
import MainReview from "../components/main/MainReview";
import MainRecommend from "../components/main/MainRecommend";
import MainWhiskyList from "../components/main/MainWhiskyList";

const AppMain = () => {
  const scrollRef = useRef(null);
  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        rotateY: {
          duration: 0.3,
        },
        y: {
          type: "spring",
          stiffness: 50,
          restDelta: 0.01,
          duration: 0.3,
        },
      },
    },
  };

  return (
    <div ref={scrollRef}>
      <Main key="0" variants={variants} viewport={{ root: scrollRef, once: true, amount: 0.3 }} />
      <MainDiary
        key="1"
        variants={variants}
        viewport={{ root: scrollRef, once: true, amount: 0.3 }}
      />
      <MainReview
        key="2"
        variants={variants}
        viewport={{ root: scrollRef, once: true, amount: 0.3 }}
      />
      {/* <MainRecommend />
      <MainWhiskyList /> */}
    </div>
  );
};

export default AppMain;

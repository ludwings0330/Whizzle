import React from "react";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userStore";

//components import
import MainDefault from "../components/main/MainDefault";
import MainRecommend from "../components/main/MainRecommend";
import MainDiary from "../components/main/MainDiary";
import MainReview from "../components/main/MainReview";

const AppMain = () => {
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);

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
      {isLogin ? (
        <MainRecommend
          key="0"
          variants={variants}
          viewport={{ root: scrollRef, once: true, amount: 0.3 }}
        />
      ) : (
        <MainDefault
          key="0"
          variants={variants}
          viewport={{ root: scrollRef, once: true, amount: 0.3 }}
        />
      )}
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

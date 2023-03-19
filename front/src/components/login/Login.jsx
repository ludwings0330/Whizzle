import React from "react";

// 버튼 import
import kakao from "../../assets/img/kakao.png";
import naver from "../../assets/img/naver.png";
import google from "../../assets/img/google.png";

//로그인 컴포넌트
const Login = () => {
  return (
    <>
      <div>
        <img src={kakao} alt="#" />
        <img src={naver} alt="#" />
        <img src={google} alt="#" />
      </div>
    </>
  );
};

export default Login;

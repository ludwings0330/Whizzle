import React from "react";

//components import
import MyBadge from "../components/mypage/MyBadge";
import MyKeep from "../components/mypage/MyKeep";
import MyLevel from "../components/mypage/MyLevel";
import MyProfile from "../components/mypage/MyProfile";
import MyReivew from "../components/mypage/MyReivew";

const AppMyPage = () => {
  return (
    <>
      <h1>마이페이지</h1>
      <MyBadge />
      <MyKeep />
      <MyLevel />
      <MyProfile />
      <MyReivew />
    </>
  );
};

export default AppMyPage;

import React from "react";
import { Route, Routes } from "react-router-dom";

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
      <Routes>
        <Route path="/mybadge" element={<MyBadge />} />
        <Route path="/mykeep" element={<MyKeep />} />
        <Route path="/mylevel" element={<MyLevel />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/myreview" element={<MyReivew />} />
      </Routes>
    </>
  );
};

export default AppMyPage;

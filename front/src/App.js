//react import
import React from "react";
import { Route, Routes } from "react-router-dom";

//pages import
import AppDiary from "./pages/AppDiary";
import AppError from "./pages/AppError";
import AppLogin from "./pages/AppLogin";
import AppMain from "./pages/AppMain";
import AppMyPage from "./pages/AppMyPage";
import AppRecommend from "./pages/AppRecommend";
import AppSearch from "./pages/AppSearch";
import AppWhisky from "./pages/AppWhisky";

//Layout import
import Layout from "./components/common/Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AppMain />} />
        <Route path="/diary/*" element={<AppDiary />} />
        <Route path="/login" element={<AppLogin />} />
        <Route path="/mypage/*" element={<AppMyPage />} />
        <Route path="/search/*" element={<AppSearch />} />
        <Route path="/recommend/*" element={<AppRecommend />} />
        <Route path="/whisky/*" element={<AppWhisky />} />
        <Route path="*" element={<AppError />} />
      </Routes>
    </Layout>
  );
}

export default App;

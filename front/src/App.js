//react import
import React from "react";
import { Route, Routes } from "react-router-dom";

//pages import
import AppDiary from "./pages/AppDiary";
import AppError from "./pages/AppError";
import AppLogin from "./pages/AppLogin";
import AppMain from "./pages/AppMain";
import AppMyPage from "./pages/AppMyPage";
import AppSearch from "./pages/AppSearch";
import AppRecommendQuestion from "./pages/AppRecommendQuestion";
import AppRecommnedResult from "./pages/AppRecommnedResult";
import AppReview from "./pages/AppReview";
import AppDailyWhisky from "./pages/AppDailyWhisky";
import AppWhisky from "./pages/AppWhisky";
import Callback from "./apis/Callback";

//Layout import
import Layout from "./components/common/Layout/Layout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AppMain />} />
        <Route path="/diary/*" element={<AppDiary />} />
        <Route path="/signin" element={<AppLogin />} />
        <Route path="/mypage/*" element={<AppMyPage />} />
        <Route path="/search/*" element={<AppSearch />} />
        <Route path="/whisky/:id" element={<AppWhisky />} />
        <Route path="/recommend/question/*" element={<AppRecommendQuestion />} />
        <Route path="/recommend/result/*" element={<AppRecommnedResult />} />
        <Route path="/review/:id" element={<AppReview />} />
        <Route path="/daily/*" element={<AppDailyWhisky />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/*" element={<AppError />} />
      </Routes>
      <ToastContainer/>
    </Layout>
  );
}

export default App;

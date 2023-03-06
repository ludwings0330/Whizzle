import React from "react";
import { Route, Routes } from "react-router-dom";

//components import
import SearchBar from "../components/search/SearchBar";
import SearchList from "../components/search/SearchList";

const AppSearch = () => {
  return (
    <>
      <h1>검색페이지</h1>
      <Routes>
        <Route path="/bar" element={<SearchBar />} />
        <Route path="/list" element={<SearchList />} />
      </Routes>
    </>
  );
};

export default AppSearch;

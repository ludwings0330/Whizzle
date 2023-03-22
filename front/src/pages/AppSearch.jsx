import React from "react";
import { Route, Routes } from "react-router-dom";

//components import
import SearchMain from "../components/search/SearchMain";
import SearchResult from "../components/search/SearchResult";

const AppSearch = () => {
  return (
    <Routes>
      <Route path="/" index element={<SearchMain />} />
      <Route path=":word" element={<SearchResult />} />
    </Routes>
  );
};

export default AppSearch;

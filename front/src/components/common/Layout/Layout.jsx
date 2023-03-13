import React from "react";

//header, footer import
import Header from "./Header";
import Footer from "./Footer";

//페이지 전체 레이아웃
const Layout = (props) => {
  return (
    <>
      <Header />
      {/* <h1>전체 레이아웃</h1> */}
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;

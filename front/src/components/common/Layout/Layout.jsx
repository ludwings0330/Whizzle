import React, { useState, useEffect } from "react";

//header, footer import
import Header from "./Header";
import Footer from "./Footer";
import MobileHeader from "./MobileHeader";

//페이지 전체 레이아웃
const Layout = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? <MobileHeader /> : <Header />}
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;

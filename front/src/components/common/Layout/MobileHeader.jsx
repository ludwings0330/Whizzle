import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logout from "../../../hooks/Logout";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../../store/userStore";
import { showAllState } from "../../../store/indexStore";
// 로고 이미지
import logo from "../../../assets/img/logo.png";
import hamburger from "../../../assets/img/hamburger.png";

const Navbar = styled.nav`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 70px;
  display: flex;
  background-color: transparent;
  justify-content: space-between;
  margin-bottom: 0px;
  max-width: 100%;
`;

const NavDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 7vw;
  height: 45px;
`;

const NavLeftDiv = styled.div`
  height: 70px;
  display: flex;
  margin-left: 3vw;
  align-items: center;
`;

const NavRightDiv = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  margin-right: 0px;
  position: relative;
`;

const MobileDiv = styled.div`
  width: 35vw;
  height: 100vh;
  max-height: 100vh;
  z-index: 100;
  position: sticky;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
`;

const SLogoImg = styled.img`
  width: 105px;
  height: 33px;
  margin-top: 5px;
`;

const SP = styled.p`
  font-size: 16px;
  :hover {
    font-weight: 700;
  }
`;

const SUserImg = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 9px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

// 해당 페이지 접속 중이거나, hovering시
const activeStyle = {
  textDecoration: "none",
  color: "#212121",
  fontWeight: 700,
};

// 접속 X
const nonActiveStyle = {
  textDecoration: "none",
  color: "#212121",
};

const MobileHeader = () => {
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);
  const logout = Logout();
  const signout = () => {
    logout();
  };

  // 메뉴바 열기
  const [showAll, setShowAll] = useRecoilState(showAllState);

  const showAllOpen = (event) => {
    event.stopPropagation();
    setShowAll(true);
  };

  const showAllClose = () => {
    setShowAll(false);
  };

  const headerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowAll(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Navbar id="navbar">
      <NavLeftDiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/">
          <SLogoImg id="logo" src={logo} alt="#" />
        </NavLink>
      </NavLeftDiv>
      {showAll ? (
        <MobileDiv ref={headerRef}>
          <NavDiv style={{ marginTop: "30px" }}>
            <NavLink
              onClick={showAllClose}
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/recommend/question"
            >
              <SP>위스키 추천</SP>
            </NavLink>
          </NavDiv>
          <NavDiv>
            <NavLink
              onClick={showAllClose}
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/diary"
            >
              <SP>위스키 다이어리</SP>
            </NavLink>
          </NavDiv>
          <NavDiv>
            <NavLink
              onClick={showAllClose}
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/search"
            >
              <SP>위스키 검색</SP>
            </NavLink>
          </NavDiv>
          {!isLogin ? (
            <NavDiv>
              <NavLink
                onClick={showAllClose}
                style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                to="/signin"
              >
                <SP className="text">로그인</SP>
              </NavLink>
            </NavDiv>
          ) : (
            <div>
              <NavDiv>
                <NavLink
                  onClick={showAllClose}
                  style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                  to="/mypage"
                >
                  <SP>마이페이지</SP>
                </NavLink>
              </NavDiv>
              <NavDiv>
                <NavLink onClick={showAllClose} style={nonActiveStyle} to="/">
                  <SP onClick={signout}>로그아웃</SP>
                </NavLink>
              </NavDiv>
            </div>
          )}
        </MobileDiv>
      ) : (
        <NavRightDiv>
          <NavDiv style={{ marginRight: "2.5vw", cursor: "pointer" }}>
            <SUserImg id="ham" onClick={showAllOpen} src={hamburger} alt="햄버거버튼" />
          </NavDiv>
        </NavRightDiv>
      )}
    </Navbar>
  );
};
export default MobileHeader;

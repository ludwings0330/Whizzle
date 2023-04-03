import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logout from "../../../hooks/Logout";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/userStore";
// 로고 이미지
import logo from "../../../assets/img/logo.png";

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
  justify-content: center;
  align-items: center;
  margin-right: 3vw;
`;

const NavLeftDiv = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const NavRightDiv = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  margin-right: 0px;
  position: relative;
`;

const SLogoImg = styled.img`
  width: 105px;
  height: 29px;
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

const SUserP = styled.p`
  font-size: 16px;
  font-weight: 800;
  background: linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const NavDropDiv = styled.div`
  flex-direction: column;
  width: 110px;
  height: 84px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-bottom-color: rgba(255, 255, 255, 0.25);
  }
`;

const SDropWrapper = styled.div`
  display: ${(props) => (props.isDrop ? "flex" : "none")};
  width: ${(props) => props.userWidth}px;
  justify-content: center;
  position: absolute;
  margin-right: 1.8vw;
  min-width: 110px;
  top: 70px;
  right: 0;
  z-index: 1;
`;

// 해당 페이지 접속 중이거나, hovering시
const activeStyle = {
  textDecoration: "none",
  color: "#FFFFFF",
  fontWeight: 700,
};

// 접속 X
const nonActiveStyle = {
  textDecoration: "none",
  color: "#FFFFFF",
};

// 네비게이션 바
const Header = () => {
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);
  const logout = Logout();
  const signout = () => {
    logout();
    dropdownHide();
  };

  // dropdown 메뉴
  const [isdrop, setIsdrop] = useState(false);
  const dropdownHandler = () => {
    setIsdrop(!isdrop);
  };
  const dropdownHide = () => {
    setIsdrop(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsdrop(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 유저 닉네임 길이에 따라 드랍다운 메뉴의 크기를 동적으로 변견
  const userRef = useRef(null);
  const [userWidth, setUserWidth] = useState();

  useEffect(() => {
    if (userRef.current) {
      const width = userRef.current.clientWidth;
      setUserWidth(width);
    }
  }, [userRef.current]);

  return (
    <>
      <Navbar id="navbar">
        <NavLeftDiv>
          <NavDiv onClick={dropdownHide}>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/">
              <SLogoImg id="logo" src={logo} alt="#" />
            </NavLink>
          </NavDiv>
        </NavLeftDiv>
        <NavRightDiv>
          <NavDiv onClick={dropdownHide}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/recommend/question"
            >
              <SP className="text">위스키 추천</SP>
            </NavLink>
          </NavDiv>
          <NavDiv onClick={dropdownHide}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/diary"
            >
              <SP className="text">위스키 다이어리</SP>
            </NavLink>
          </NavDiv>
          <NavDiv onClick={dropdownHide}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/search"
            >
              <SP className="text">위스키 검색</SP>
            </NavLink>
          </NavDiv>
          {!isLogin ? (
            <NavDiv>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                to="/signin"
              >
                <SP className="text">로그인</SP>
              </NavLink>
            </NavDiv>
          ) : (
            <NavDiv
              ref={userRef}
              onClick={dropdownHandler}
              style={{ marginRight: "2.5vw", cursor: "pointer" }}
            >
              <SUserImg src={user.image.url} alt="프로필사진" />
              <SUserP>{user.nickname}</SUserP>
            </NavDiv>
          )}
          <SDropWrapper userWidth={userWidth} isDrop={isdrop}>
            <NavDropDiv>
              <NavDiv onClick={dropdownHide} style={{ marginRight: "0px", height: "40px" }}>
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                  to="/mypage"
                >
                  <SP style={{ marginBottom: "5px" }} className="dropdown">
                    마이페이지
                  </SP>
                </NavLink>
              </NavDiv>
              <NavDiv style={{ marginRight: "0px", height: "40px" }}>
                <NavLink style={nonActiveStyle} to="/">
                  <SP className="dropdown" onClick={signout}>
                    로그아웃
                  </SP>
                </NavLink>
              </NavDiv>
            </NavDropDiv>
          </SDropWrapper>
        </NavRightDiv>
      </Navbar>
    </>
  );
};

export default Header;

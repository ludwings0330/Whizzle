import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
// 로고 이미지
import logo from "../../../assets/img/logo.png";

const Navbar = styled.nav`
  position: flex;
  top: 0;
  width: 100vw;
  height: 70px;
  display: flex;
  background-color: #f84f5a;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
  const me = true;
  return (
    <>
      <Navbar id="navbar">
        <NavLeftDiv>
          <NavDiv>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/">
              <SLogoImg src={logo} alt="#" />
            </NavLink>
          </NavDiv>
        </NavLeftDiv>
        <NavRightDiv>
          <NavDiv>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/recommend/question"
            >
              <SP>위스키 추천</SP>
            </NavLink>
          </NavDiv>
          <NavDiv>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/diary"
            >
              <SP>위스키 다이어리</SP>
            </NavLink>
          </NavDiv>
          <NavDiv>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/search"
            >
              <SP>위스키 검색</SP>
            </NavLink>
          </NavDiv>
          <NavDiv>
            {me ? (
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                to="/login"
              >
                <SP>로그인</SP>
              </NavLink>
            ) : (
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
                to="/mypage"
              >
                <SP>마이페이지</SP>
              </NavLink>
            )}
          </NavDiv>
        </NavRightDiv>
      </Navbar>
    </>
  );
};

export default Header;

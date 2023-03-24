import React, { useState, useEffect } from "react";
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

const SUserImg = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 9px;
`;

const SUserP = styled.p`
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  cursor: pointer;
  :hover {
    font-weight: 800;
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
  const user = useRecoilValue(userState);
  const isLogin = Boolean(user.id);
  const logout = Logout();
  const signout = () => {
    logout();
  };

  const [isdrop, setIsdrop] = useState(false);
  const dropdownHandler = () => {
    setIsdrop(!isdrop);
  };

  // const [sUserPWidth, setSUserPWidth] = useState(0);
  // useEffect(() => {
  //   if (isLogin) {
  //     const userP = document.getElementById("sUserP");
  //     console.log(userP.offsetWidth);
  //     setSUserPWidth(userP.offsetWidth);
  //   }
  // }, []);

  // const navDivWidth = sUserPWidth + 33;
  // console.log(navDivWidth);
  return (
    <>
      <Navbar id="navbar">
        <NavLeftDiv>
          <NavDiv>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/">
              <SLogoImg id="logo" src={logo} alt="#" />
            </NavLink>
          </NavDiv>
        </NavLeftDiv>
        <NavRightDiv>
          <NavDiv>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/recommend/question"
            >
              <SP className="text">위스키 추천</SP>
            </NavLink>
          </NavDiv>
          <NavDiv>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
              to="/diary"
            >
              <SP className="text">위스키 다이어리</SP>
            </NavLink>
          </NavDiv>
          <NavDiv>
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
                to="/login"
              >
                <SP className="text">로그인</SP>
              </NavLink>
            </NavDiv>
          ) : (
            <NavDiv style={{ marginRight: "2.5vw" }}>
              <SUserImg src={user.image.url} alt="프로필사진" />
              <SUserP id="sUserP" onClick={dropdownHandler}>
                drunk
              </SUserP>
            </NavDiv>
            // <NavLink
            //   style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            //   to="/login"
            // >
            //   <SP className="text" onClick={signout}>
            //     로그아웃
            //   </SP>
            // </NavLink>
          )}
        </NavRightDiv>
      </Navbar>
    </>
  );
};

export default Header;

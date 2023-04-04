import colorLogo from "../assets/img/colorLogo.png";
import logo from "../assets/img/logo.png";
import hamburger from "../assets/img/hamburger.png";
import colorHamburger from "../assets/img/color_hamburger.png";

export function changeHeader() {
  // 로고 변경
  const navLogo = document.getElementById("logo");
  navLogo.src = colorLogo;

  // 글자 색 변경
  const navTexts = document.querySelectorAll(".text, .dropdown");
  for (let i = 0; i < navTexts.length; i++) {
    navTexts[i].style.color = "#181818";
  }

  // 아래쪽 외곽선 추가
  const nav = document.getElementById("navbar");
  nav.style.borderBottom = "1px solid #D2D2D2";

  // mobile nav 버튼 색 변경
  const mobileNav = document.getElementById("ham");
  if (mobileNav) {
    mobileNav.src = colorHamburger;
  }
}

export function rollbackHeader() {
  // 싹다 되돌리기
  const navLogo = document.getElementById("logo");
  navLogo.src = logo;

  const navTexts = document.querySelectorAll(".text, .dropdown");
  for (let i = 0; i < navTexts.length; i++) {
    navTexts[i].style.color = "#ffffff";
  }

  const nav = document.getElementById("navbar");
  nav.style.borderBottom = "0px solid #D2D2D2";

  const mobileNav = document.getElementById("ham");
  if (mobileNav) {
    mobileNav.src = hamburger;
  }
}

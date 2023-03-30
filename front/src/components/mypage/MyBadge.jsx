import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";
import { badgeApi } from "../../apis/mypage";

import MyBadgeItem from "./MyBadgeItem";

const SBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 20px 30px;
  flex-wrap: wrap;
  max-width: 730px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  border-radius: 10px;
  margin-bottom: 70px;
  margin-top: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;
`;

//마이페이지 뱃지
const MyBadge = () => {
  const user = useRecoilValue(userState);
  const id = user.id;

  const [badges, setBadges] = useState([]);

  const getBadge = async () => {
    const defaultBadge = {
      url: "badge",
      description: "",
      achieveDate: "",
    };

    try {
      const myBadges = await badgeApi(id);
      setBadges(myBadges);
      if (myBadges.length % 5 !== 0) {
        const count = 5 - (myBadges.length % 5);
        Array.from({ length: count }).forEach(() => {
          setBadges((prev) => [...prev, defaultBadge]);
        });
      }
    } catch {
      console.log("뱃지 불러오기 실패");
    }
  };

  useEffect(() => {
    getBadge();
  }, []);

  return (
    <>
      <SBox>
        {badges.map((badge, index) => (
          <MyBadgeItem key={index} badge={badge} />
        ))}
      </SBox>
    </>
  );
};

export default MyBadge;

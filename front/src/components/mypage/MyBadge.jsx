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
const MyBadge = ({ memberId }) => {
  const user = useRecoilValue(userState);
  const memberIdToUse = memberId || user.id;

  const [badges, setBadges] = useState([]);

  const getBadge = async () => {
    const defaultBadge = {
      url: "badge",
      description: "",
      achieveDate: "",
    };

    try {
      const myBadges = await badgeApi(memberIdToUse, {});
      setBadges(myBadges);
      if (myBadges.length % 5 !== 0) {
        const count = 5 - (myBadges.length % 5);
        Array.from({ length: count }).forEach(() => {
          setBadges((prev) => [...prev, defaultBadge]);
        });
      }
    } catch {}
  };

  useEffect(() => {
    getBadge();
  }, [memberIdToUse]);

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

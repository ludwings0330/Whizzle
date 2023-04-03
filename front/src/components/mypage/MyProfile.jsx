import React, { useState } from "react";

import MyLevel from "./MyLevel";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";

//import css
import styled from "styled-components";

//import images
import cameraIcon from "../../assets/img/camera.png";
import pencilIcon from "../../assets/img/nameEdit.png";

//
import { profileChangeApi } from "../../apis/mypage";
import { nicknameChangeApi } from "../../apis/mypage";

const SImgContainer = styled.div`
  position: relative;
  display: inline-block;
  height: 250px;
`;

const SCameraIcon = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 30px;
  width: 30px;
  padding: 10px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  transform: translate(-17px, -17px);
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.5);
`;

const SImg = styled.img`
  height: 250px;
  width: 250px;
  filter: drop-shadow(0px 8px 24px rgba(149, 157, 165, 0.2));
  background-color: white;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.5);

  border-radius: 999px;
`;

const SP = styled.p`
  font-size: 40px;
  font-weight: bold;
  padding-top: 20px;
  margin-bottom: 15px;
`;

const SInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  padding-left: 20px;
  margin-bottom: 50px;
  margin-left: 20px;
`;

const SMainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const SPencilIcon = styled.img`
  padding-top: 40px;
  padding-left: 30px;
  height: 40px;
`;

const SNicknameDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SInput = styled.input``;

//마이페이지 상단 해당 유저의 기본 정보
const MyProfile = () => {
  const user = useRecoilValue(userState);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [newProfileImage, setProfileImage] = useState(user.image.url);
  const [newOriginName, setNewOriginName] = useState(user.image.originName);
  const [userStateData, setUserStateData] = useRecoilState(userState);
  const [isNicknameEditing, setIsNicknameEditing] = useState(false);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const success = await profileChangeApi(file);

    if (success) {
      // 프로필 이미지가 성공적으로 업데이트된 경우 로컬 상태 업데이트
      setUserStateData({
        ...userStateData,
        image: {
          url: URL.createObjectURL(file), // File 객체에서 URL 생성
          originName: file.name,
        },
      });
      setProfileImage(URL.createObjectURL(file));
    } else {
      console.error("Failed to update profile image.");
    }
  };

  const handleNicknameChange = async (e) => {
    const newNickname = e.target.value;
    const response = await nicknameChangeApi(newNickname);
    console.log(response.data);

    setUserStateData({
      ...userStateData,
      nickname: response.data.nickname,
    });
    setNewNickname(response.data.nickname);
  };

  const handleNicknameEditing = () => {
    setIsNicknameEditing(true);
  };

  const handleNicknameEditingFinish = () => {
    setIsNicknameEditing(false);
  };

  return (
    <>
      <SMainDiv>
        <SImgContainer>
          <SImg src={`${user.image.url}`} alt={user.name} />
          <label htmlFor="profile-image-upload">
            <SCameraIcon src={cameraIcon} alt="Change Profile Picture" />
          </label>
          <input
            id="profile-image-upload"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleProfileImageChange}
            style={{ display: "none" }}
          />
        </SImgContainer>
        <SInfoDiv>
          <SNicknameDiv>
            {isNicknameEditing ? (
              <SInput
                value={newNickname}
                onChange={handleNicknameChange}
                onBlur={handleNicknameEditingFinish}
              />
            ) : (
              <>
                <SP>{user.nickname}</SP>
                <SPencilIcon
                  src={pencilIcon}
                  alt="Change Nickname"
                  onClick={handleNicknameEditing}
                />
              </>
            )}
          </SNicknameDiv>
          <MyLevel level={user.level} max={100} />
        </SInfoDiv>
      </SMainDiv>
    </>
  );
};

export default MyProfile;

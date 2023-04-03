import React, { useState } from "react";
import styled from "styled-components";
import MyLevel from "./MyLevel";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";
import cameraIcon from "../../assets/img/camera.png";
import pencilIcon from "../../assets/img/nameEdit.png";

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
  padding: 10px; // 원의 크기를 조절하는 데 사용되는 패딩
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  transform: translate(-17px, -17px);
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.5); // 그림자 추가
`;

const SImg = styled.img`
  height: 250px;
  width: 250px;
  filter: drop-shadow(0px 8px 24px rgba(149, 157, 165, 0.2));
  background-color: white;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.5); // 그림자 추가

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
const SButton = styled.button`
  border: 2px solid #f84f5a;
  border-radius: 12px;
  background: #f84f5a;
  color: white;
  font-size: 15px;
  cursor: pointer;
  width: 60px;
  height: 31px;
  font-family: Pretendard Variable;
`;

const SInput = styled.input``;

//마이페이지 상단 해당 유저의 기본 정보
const MyProfile = () => {
  const user = useRecoilValue(userState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(user.nickname);

  const [newNickname, setNewNickname] = useState(user.nickname);
  const [newProfileImage, setProfileImage] = useState(user.image.url);
  const [userStateData, setUserStateData] = useRecoilState(userState);

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

  const handleNicknameChange = async () => {
    if (!editedNickname || editedNickname.length === 0) {
      alert("닉네임은 비어있을 수 없습니다.");
      return;
    }
    if (editedNickname.length > 10) {
      alert("닉네임은 10글자 이하로 입력해주세요.");
      return;
    }

    const response = await nicknameChangeApi(editedNickname);
    console.log(response);

    if (response) {
      setIsEditing(false);

      setUserStateData({
        ...userStateData,
        nickname: editedNickname,
      });
      setNewNickname(editedNickname);
    }
  };

  const handleEditNicknameClick = () => {
    setIsEditing(true);
  };

  const handleEditNicknameCancel = () => {
    setIsEditing(false);
    setEditedNickname(user.nickname);
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
            {isEditing ? (
              <>
                <SInput
                  type="text"
                  value={editedNickname}
                  onChange={(e) => setEditedNickname(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleNicknameChange();
                      setIsEditing(false);
                    }
                  }}
                />
                <div>
                  <SButton onClick={handleNicknameChange}>수정완료</SButton>
                  <SButton onClick={handleEditNicknameCancel}>취소</SButton>
                </div>
              </>
            ) : (
              <>
                <SP>{user.nickname}</SP>
                <SPencilIcon
                  src={pencilIcon}
                  alt="Change Nickname"
                  onClick={handleEditNicknameClick}
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

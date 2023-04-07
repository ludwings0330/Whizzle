import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyLevel from "./MyLevel";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";
import cameraIcon from "../../assets/img/camera.png";
import pencilIcon from "../../assets/img/nameEdit.png";
import { error } from "../notify/notify";

import { profileChangeApi } from "../../apis/mypage";
import { nicknameChangeApi } from "../../apis/mypage";
import { userInfo } from "../../apis/userinfo";

const SImgContainer = styled.div`
  position: relative;
  display: inline-block;
  height: 250px;
  margin-left: 10px;
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
  margin-top: 17px;
  height: 220px;
  width: 220px;
  background-color: white;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2); // 그림자 추가
  object-fit: cover;
  border-radius: 999px;
`;

const SP = styled.p`
  font-size: 32px;
  font-weight: bold;
  padding-top: 40px;
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
  cursor: pointer;
  padding-top: 58px;
  padding-left: 30px;
  height: 35px;
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
  margin-left: 5px;
  height: 31px;
  padding: 0px 7px;
  font-family: Pretendard Variable;
`;

const SInput = styled.input`
  font-size: 32px;
  font-weight: bold;
  font-family: Pretendard Variable;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 300px;
  &:focus {
    outline: 0;
    background: none;
  }
`;

//마이페이지 상단 해당 유저의 기본 정보
const MyProfile = (props) => {
  const user = useRecoilValue(userState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(user.nickname);

  const [newNickname, setNewNickname] = useState(user.nickname);
  const [newProfileImage, setProfileImage] = useState(user.image.url);
  const [userStateData, setUserStateData] = useRecoilState(userState);

  const { memberId } = props;

  const [otherUserInfo, setOtherUserInfo] = useState(null);
  const isEditable = memberId === user.id;

  useEffect(() => {
    setOtherUserInfo(null);
    if (memberId !== user.id) {
      const fetchUserInfo = async () => {
        const userData = await userInfo(memberId);
        setOtherUserInfo(userData);
      };

      fetchUserInfo();
    }
  }, [memberId]);

  //나의 마이페이지에는 memberId가 없음
  //타인의 마이페이지에 들어갈 때는 memberId가 존재
  //따라서 memberId가 존재한다면 memberId의 nickname과 profileImageUrl, level을 띄우고
  //수정할 수 없도록 하기

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const newUrl = await profileChangeApi(file);

    if (newUrl && newUrl.length) {
      // 프로필 이미지가 성공적으로 업데이트된 경우 로컬 상태 업데이트
      setUserStateData({
        ...userStateData,
        image: {
          url: newUrl, // File 객체에서 URL 생성
          originName: file.name,
        },
      });
      setProfileImage(newUrl);
    } else {
      console.error("Failed to update profile image.");
    }
  };

  const handleNicknameChange = async () => {
    if (!editedNickname || editedNickname.length === 0) {
      error("닉네임은 비어있을 수 없습니다.");
      return;
    }
    if (editedNickname.length > 10) {
      error("닉네임은 10글자 이하로 입력해주세요.");
      return;
    }

    const response = await nicknameChangeApi(editedNickname);

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
          <SImg
            src={`${otherUserInfo ? otherUserInfo.image.url : user.image.url}`}
            alt={user.name}
          />
          {isEditable && (
            <>
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
            </>
          )}
        </SImgContainer>
        <SInfoDiv>
          <SNicknameDiv>
            {isEditing ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "71px",
                }}
              >
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
                  <SButton onClick={handleEditNicknameCancel}>수정취소</SButton>
                </div>
              </div>
            ) : (
              <>
                <SP>{otherUserInfo ? otherUserInfo.nickname : user.nickname}</SP>
                {isEditable && (
                  <SPencilIcon
                    src={pencilIcon}
                    alt="Change Nickname"
                    onClick={handleEditNicknameClick}
                  />
                )}
              </>
            )}
          </SNicknameDiv>
          <MyLevel level={otherUserInfo ? otherUserInfo.level : user.level} max={100} />
        </SInfoDiv>
      </SMainDiv>
    </>
  );
};

export default MyProfile;

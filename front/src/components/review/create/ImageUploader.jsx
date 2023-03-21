import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

import imgupload from "../../../assets/img/imgupload.png";

const SDiv = styled.div`
  border: 2px dashed #ccc;
  width: 930px;
  height: 325px;
  text-align: center;
  position: relative;
`;

const SP = styled.p`
  margin-top: 20px;

  &:hover {
    cursor: pointer;
    color: blue;
  }

  &:active {
    color: red;
  }
`;

const SImg = styled.img`
  height: 70px;
  width: 70px;
  margin-bottom: 10px;
`;

const SImgDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // 파일을 업로드합니다.
    // 파일 업로드 후 서버에서 이미지 URL을 받아와 setImage로 상태를 업데이트합니다.
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <SDiv {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <SImgDiv>
            <SImg src={imgupload} alt="" />
            <SP>파일을 올리는 중 입니다</SP>
          </SImgDiv>
        ) : (
          <SImgDiv>
            <SImg src={imgupload} alt="" />
            <SP>이미지를 드래그하거나 파일을 업로드 하세요</SP>
            <p>지원 확장자 : jpg, jpeg, png</p>
          </SImgDiv>
        )}
        {image && <img src={image} alt="Uploaded image" />}
      </SDiv>
    </>
  );
};

export default ImageUploader;

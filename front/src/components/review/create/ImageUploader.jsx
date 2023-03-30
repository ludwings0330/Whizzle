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
  height: 10px;
  width: 10px;
  margin-bottom: 10px;
`;

const SImgDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageUploader = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 5) {
        alert("최대 5장의 사진까지 업로드 가능합니다.");
        return;
      }

      const imageFiles = acceptedFiles.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );

      if (imageFiles.length > 5 - images.length) {
        alert(
          `최대 5장까지 업로드 가능합니다. 현재 ${images.length}장의 사진이 업로드되어 있습니다.`
        );
        return;
      }

      const imageUrls = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFiles[i]);
        reader.onload = () => {
          imageUrls.push(reader.result);

          if (imageUrls.length === imageFiles.length) {
            setImages((prevImages) => [...prevImages, ...imageUrls]);
          }
        };
      }
    },

    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

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
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Uploaded image ${index + 1}`} />
        ))}
      </SDiv>
    </>
  );
};

export default ImageUploader;

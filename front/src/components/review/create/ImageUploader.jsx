import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { error } from "../../notify/notify";

import imgupload from "../../../assets/img/imgupload.png";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  height: "100%",
  alignItems: "center",
  gap: "15px",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  width: "256px",
  height: "256px",
  boxSizing: "border-box",
  position: "relative",
  background: "#f5f5f5ac",
  justifyContent: "center",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  width: "100%",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #d8d8d8;
  width: 800px;
  min-height: 257px;
  gap: 5px;
  padding: 15px;
`;

const SP = styled.p`
  margin: 2px;
  cursor: pointer;
  color: #9d9d9d;
`;

const SImg = styled.img`
  height: 70px;
  width: 70px;
  margin-bottom: 10px;
`;

const ImageUploader = ({ files, handleFiles, maxNum, preImages, handlePreImages }) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      if (files.length + acceptedFiles.length + (preImages ? preImages.length : 0) > maxNum) {
        error(`최대 ${maxNum}개의 이미지까지 업로드할 수 있습니다.`);
        return;
      }
      const newImgs = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      preImages
        ? handleFiles([...files, ...newImgs].splice(0, maxNum - preImages.length))
        : handleFiles([...files, ...newImgs].splice(0, maxNum));
    },
    maxFiles: maxNum,
    noClick: true,
  });

  const addBtn = (
    <button
      style={{
        width: "256px",
        height: "256px",
        bolder: "none",
        background: "none",
        border: "2px dashed #D8D8D8",
      }}
      className="plus"
      onClick={(e) => {
        e.preventDefault();
        open();
      }}
    >
      <p style={{ textAlign: "center", color: "#9d9d9d" }}>
        이미지를 삭제하려면 <br />
        더블클릭 하세요.
      </p>
    </button>
  );

  const deleteImage = (f) => {
    handleFiles(files.filter((file) => file !== f));
  };

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={index}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} onDoubleClick={() => deleteImage(file)} />
      </div>
    </div>
  ));

  const preThumbs =
    preImages &&
    preImages.map((image, index) => (
      <div style={thumb} key={index}>
        <div style={thumbInner}>
          <img
            src={image.reviewImageUrl}
            style={img}
            alt="gogogo"
            onDoubleClick={() => handlePreImages(image.reviewImageId)}
          />
        </div>
      </div>
    ));

  return (
    <SDiv {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />

      {files.length + (preImages ? preImages.length : 0) === 0 ? (
        <div
          onClick={(e) => {
            e.preventDefault();
            open();
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            justifySelf: "center",
            marginY: "3rem",
            marginX: "2rem",
          }}
        >
          <button style={{ background: "white", border: "none", cursor: "pointer" }}>
            <SImg src={imgupload} />
          </button>
          <SP>이미지를 드래그하거나 클릭하여 직접 선택하세요.</SP>
          <SP>지원 확장자 : jpg, jpeg, png</SP>
        </div>
      ) : (
        <>
          <aside style={thumbsContainer}>
            {preThumbs}
            {thumbs}
            {addBtn}
          </aside>
        </>
      )}
    </SDiv>
  );
};

export default ImageUploader;

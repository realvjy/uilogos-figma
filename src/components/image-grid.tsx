// Image-grid.tsx
// Create view and setup canvas/image reference to add on figma canvas
// 11-June-2022

import * as React from "react";
import styled from "styled-components";
import { setBg } from "./helpers";

interface ImageGridProps {
  name: string;
  url: string;
  keyword: string;
  color: string;
  type: string;
  imgRef: any;
  canRef: any;
}

function ImageGrid({
  name,
  keyword,
  url,
  color,
  type,
  imgRef,
  canRef,
}: ImageGridProps) {
  // const canvasRef = React.useRef(null);
  // const imgRef = React.useRef(null);
  //   const imageKitPrefix = `https://ik.imagekit.io/3dicons/tr:w-100,h-100/v1/${angle}/${color}/`; // For view optimized 100px
  const prefix = `https://uilogos.co/uilogos/${type}/${
    type === "flags" ? "" : color + "/"
  }`;
  const sufix = `${name}.png?new_icon`;

  return (
    <ImageWrap>
      <Button
        key={name}
        onClick={() => {
          setBg(name, url, imgRef, canRef);
        }}
        className={`${type === "Country Flags" ? "flag" : ""}`}
      >
        <img src={url} alt="" width="100%" />
      </Button>
      <div className={`${type === "Country Flags" ? "show" : "hide"}`}>
        {name}
      </div>
    </ImageWrap>
  );
}

export default ImageGrid;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

// Styling button as image
const Button = styled.button`
  margin: 0;
  padding: 8px;
  background-color: #ffffff;
  border: 1px solid var(--figma-color-bg-secondary);
  box-shadow: none;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  :hover {
    border: 1px solid var(--figma-color-border-brand);
    img {
      opacity: 0.9;
    }
  }
  &.flag {
    padding: 0;
    img {
      border-radius: 3px;
    }
  }
`;

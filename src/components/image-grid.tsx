// Image-grid.tsx
// Create view and setup canvas/image reference to add on figma canvas
// Created: 11-June-2022

import * as React from "react";
import styled from "styled-components";
import { getLogo } from "./helpers";

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
  const prefix = `https://uilogos.co/uilogos/${type}/${type === "flags" ? "" : color + "/"
    }`;
  const sufix = `${name}.png?new_icon`;

  return (
    <ImageWrap>
      <Button
        key={name}
        onClick={() => {
          getLogo(name, url, imgRef, canRef);
        }}
        className={`${type === "Country Flags" ? "flag" : ""}`}
      >
        <img src={url} alt="" />
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
  min-height: 100px;
`;

// Styling button as image
const Button = styled.button`
  margin: 0;
  padding: 8px;
  border: 0;
  background-color: white;
  box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.15);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  outline: 0;
  height: 100%;
  img {
    max-width: 70px;
    max-height: 40px;
    transition: all 0.3s ease;
  }
  :hover {
    /* border: 1px solid var(--figma-color-border-brand); */
    img {
      opacity: 0.9;
      transform: scale(1.1);
    }
  }
  &.flag {
    padding: 0;
    img {
      width: 100% !important;
      border-radius: 3px;
    }
  }
`;

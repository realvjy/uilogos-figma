// Image-grid.tsx
// Create view and setup canvas/image reference to add on figma canvas
// Created: 11-June-2022

import * as React from "react";
import { useState, useEffect, useMemo } from 'react';
import styled from "styled-components";
import { getLogo, getLogoWithPos } from "./helpers";

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

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, url, name) => {
    e.dataTransfer.setData('application/json', JSON.stringify(url));
    setDraggingId(name);

    // Create a smaller drag preview
    const dragPreview = document.createElement('canvas');
    const ctx = dragPreview.getContext('2d');

    // Set preview size
    dragPreview.width = 100;  // smaller width
    dragPreview.height = 100; // smaller height

    // Create temporary image to draw scaled version
    const tempImage = new Image();
    tempImage.src = url;

    tempImage.onload = () => {
      if (ctx) {
        // Draw scaled image maintaining aspect ratio
        const scale = Math.min(100 / tempImage.width, 100 / tempImage.height);
        const newWidth = tempImage.width * scale;
        const newHeight = tempImage.height * scale;

        // Center the image in the canvas
        const offsetX = (100 - newWidth) / 2;
        const offsetY = (100 - newHeight) / 2;

        ctx.drawImage(tempImage, offsetX, offsetY, newWidth, newHeight);
      }
    };

    // Set the preview as drag image
    e.dataTransfer.setDragImage(dragPreview, 50, 50);

    // Listen for mouse move events during drag
    window.addEventListener('mousemove', handleMouseMove);

    // // Create a drag ghost image
    // const dragImage = new Image();
    // dragImage.src = url;
    // e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setDropPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggingId(null);

    // Remove mouse move listener
    window.removeEventListener('mousemove', handleMouseMove);

    // Get the final drop position relative to the plugin window
    const finalPosition = {
      x: e.clientX,
      y: e.clientY
    };

    getLogoWithPos(name, url, imgRef, canRef, finalPosition);
  };


  return (
    <ImageWrap
    // draggable={true}
    // onDragStart={(e) => handleDragStart(e, url, name)}
    // onDragEnd={handleDragEnd}
    >
      <Button
        key={name}
        onClick={() => {
          getLogo(name, url, imgRef, canRef);
        }}
        className={`${type === "flags" ? "flag" : ""}`}
      >
        <img src={url} alt={name} className={`label ${type === "flags" ? "flag" : ""}`} />
        <div className={`label ${type === "flags" ? "show" : "hide"}`}>
          {name}
        </div>
      </Button>

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
  .flag{
      box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.05);
  }
  .label{
    margin-top: 4px;
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

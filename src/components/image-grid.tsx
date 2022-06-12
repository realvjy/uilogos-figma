// Image-grid.tsx
// Create view and setup canvas/image reference to add on figma canvas
// 11-June-2022

import * as React from "react";
import styled from "styled-components";

interface ImageGridProps {
  name: string;
  url: string;
  keyword: string;
  color: string;
  type: string;
  imgRef: any;
  canRef: any;
}

// Get image and return image data to add on figma
const getImageData = (image, canvasRef) => {
  const canvas = canvasRef.current;
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  return {
    imageData: context.getImageData(0, 0, image.width, image.height),
    canvas,
    context,
  };
};

// Load image from the view
const loadImage = async (src, imgRef) =>
  new Promise((resolve, reject) => {
    console.log(src, "here");

    const img = imgRef.current;
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src + "?new-icon";
    console.log(img.src);
  });

// Encode image to object to upload on figma
async function encodeFigma(canvas, ctx, imageData) {
  ctx.putImageData(imageData, 0, 0);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      //@ts-ignore
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = () => reject(new Error("Could not read from blob"));
      reader.readAsArrayBuffer(blob);
    });
  });
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

  const setBg = async () => {
    console.log("inside setBG");
    console.log(url);

    const image = await loadImage(`${url}`, imgRef);

    const { imageData, canvas, context } = getImageData(image, canRef);

    const newBytes = await encodeFigma(canvas, context, imageData);

    parent.postMessage(
      {
        pluginMessage: {
          type: "set-bg",
          icoName: name,
          data: { newBytes },
        },
      },
      "*"
    );
  };

  return (
    <ImageWrap>
      <Button
        key={name}
        onClick={() => {
          setBg();
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

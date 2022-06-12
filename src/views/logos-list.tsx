import * as React from "react";

import styled from "styled-components";
import MenuTitle from "../components/menu-title";
import ImageGrid from "../components/image-grid";

const LogoList = (props) => {
  const flags = props.logoData;
  const canvasRef = React.useRef(null);
  const imgRef = React.useRef(null);

  const handleCallback = (childData) => {
    props.parentCallback(childData);
  };
  return (
    <ContentPanel id="color-logotype">
      <MenuTitle title={props.title} parentCallback={handleCallback} />

      <ImageContainer className={props.class}>
        {flags.map((flag, i) => {
          return (
            <ImageGrid
              name={flag.Name}
              url={flag.URL}
              keyword={"na"}
              key={flag.Name}
              color={"color"}
              type={props.title}
              imgRef={imgRef}
              canRef={canvasRef}
            />
          );
        })}
      </ImageContainer>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <img ref={imgRef} style={{ display: "none" }} />
    </ContentPanel>
  );
};

export default LogoList;

const ContentPanel = styled.div`
  display: block;
`;

const ImageContainer = styled.div`
  display: grid;
  z-index: -1;
  grid-gap: 6px;
  padding: 8px;
  margin-bottom: 40px;
  &.grid-4 {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
  }
  &.grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  &.grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
`;

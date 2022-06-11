import * as React from "react";

import styled from "styled-components";
import MenuTitle from "../../components/menu-title";
import ImageGrid from "../../components/image-grid";

const ColorLogotype = (props) => {
  const logos = props.logoData;

  const handleCallback = (childData) => {
    props.parentCallback(childData);
  };

  return (
    <ContentPanel id="color-logotype">
      <MenuTitle title="Color Logotype" parentCallback={handleCallback} />

      <ImageContainer className="grid-3 logotype">
        {logos.map((logo, i) => {
          return (
            <ImageGrid
              name={logo.Name}
              url={logo.URL}
              keyword={"icon.keywords"}
              key={logo.Name}
              color={"color"}
              type={"full"}
              imgRef={"imgRef"}
              canRef={"canvasRef"}
            />
          );
        })}
      </ImageContainer>
    </ContentPanel>
  );
};

export default ColorLogotype;

const ContentPanel = styled.div`
  display: block;
`;

const ImageContainer = styled.div`
  display: grid;

  grid-gap: 6px;
  padding: 8px;
  margin-bottom: 40px;
  &.grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  &.grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  &.grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
`;

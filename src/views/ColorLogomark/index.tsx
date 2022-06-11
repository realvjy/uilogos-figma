import * as React from "react";

import MenuTitle from "../../components/menu-title";
import styled from "styled-components";
import ImageGrid from "../../components/image-grid";

const ColorLogomark = (props) => {
  const logos = props.logoData;

  return (
    <ContentPanel id="color-logomark">
      <MenuTitle title="Color Logomark" />

      <ImageContainer className="grid-4">
        {logos.map((logo, i) => {
          return (
            <ImageGrid
              name={"atica"}
              url={logo.URL}
              keyword={"icon.keywords"}
              key={"icon.name"}
              color={"color"}
              type={"mark"}
              imgRef={"imgRef"}
              canRef={"canvasRef"}
            />
          );
        })}
      </ImageContainer>
    </ContentPanel>
  );
};

export default ColorLogomark;

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
    grid-gap: 4px;
  }
  &.grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  &.grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
`;

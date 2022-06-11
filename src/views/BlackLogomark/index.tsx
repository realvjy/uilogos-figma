import * as React from "react";

import MenuTitle from "../../components/menu-title";
import styled from "styled-components";
import ImageGrid from "../../components/image-grid";

const BlackLogomark = (props) => {
  const logos = props.logoData;

  return (
    <ContentPanel id="black-logomark">
      <MenuTitle title="B/W Logomark" />

      <ImageContainer className="grid-4">
        {logos.map((logo, i) => {
          return (
            <ImageGrid
              name={"atica"}
              url={logo.URL}
              keyword={"icon.keywords"}
              key={"icon.name"}
              color={"black"}
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

export default BlackLogomark;

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

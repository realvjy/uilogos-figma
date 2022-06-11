import * as React from "react";

import styled from "styled-components";
import MenuTitle from "../../components/menu-title";
import ImageGrid from "../../components/image-grid";

const CountryFlag = (props) => {
  const flags = props.logoData;
  const handleCallback = (childData) => {
    props.parentCallback(childData);
  };
  return (
    <ContentPanel id="color-logotype">
      <MenuTitle title="Country Flags" parentCallback={handleCallback} />

      <ImageContainer className="grid-4">
        {flags.map((flag, i) => {
          return (
            <ImageGrid
              name={flag.Name}
              url={flag.URL}
              keyword={"icon.keywords"}
              key={flag.Name}
              color={"color"}
              type={"flags"}
              imgRef={"imgRef"}
              canRef={"canvasRef"}
            />
          );
        })}
      </ImageContainer>
    </ContentPanel>
  );
};

export default CountryFlag;

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
    grid-gap: 8px;
  }
  &.grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  &.grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
`;

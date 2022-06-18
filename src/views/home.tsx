import * as React from "react";

import theme from "../theme";

import styled from "styled-components";
import { ListIcon, ShuffleIcon } from "../components/icons";
import {
  BlackMarkIcon,
  BlackTypeIcon,
  BrandIcon,
  ColorMarkIcon,
  ColorTypeIcon,
  FlagIcon,
} from "../components/logos-icons";
import Footer from "../components/footer";
import { getLogos } from "../components/helpers";

declare function require(path: string): any;

const Home = (props) => {
  const canvasRef = React.useRef(null);
  const imgRef = React.useRef(null);
  // Call event to fake routing and swith to list view
  const onClickIcon = (event) => {
    props.parentCallback(event);
  };

  return (
    <>
      <HomeMenu>
        <OptionBox>
          <Title
            onClick={() =>
              getLogos(props.logoData.fullLogosColor, imgRef, canvasRef)
            }
          >
            <ColorTypeIcon height="36px" width="36px" className="lefticon" />
            <p>Color Logotype</p>
          </Title>
          <Buttons>
            <li>
              <Button
                onClick={() =>
                  getLogos(props.logoData.fullLogosColor, imgRef, canvasRef)
                }
              >
                <ShuffleIcon height="12px" width="12px" />
              </Button>
              <ToolTip className="r">
                <div className="nib-r"></div>
                <div className="text">Random</div>
              </ToolTip>
            </li>
            <li>
              <Button onClick={() => onClickIcon("colorlogotype")}>
                <ListIcon height="12px" width="12px" />
              </Button>
              <ToolTip className="r">
                <div className="nib-r"></div>
                <div className="text">View</div>
              </ToolTip>
            </li>
          </Buttons>
        </OptionBox>

        <OptionBox>
          <Title
            onClick={() =>
              getLogos(props.logoData.fullLogosBW, imgRef, canvasRef)
            }
          >
            <BlackTypeIcon height="36px" width="36px" className="lefticon" />
            <p>B/W Logotype</p>
          </Title>
          <Buttons>
            <li>
              <Button
                onClick={() =>
                  getLogos(props.logoData.fullLogosBW, imgRef, canvasRef)
                }
              >
                <ShuffleIcon height="12px" width="12px" />
              </Button>
            </li>
            <li>
              <Button onClick={() => onClickIcon("blacklogotype")}>
                <ListIcon height="12px" width="12px" />
              </Button>
            </li>
          </Buttons>
        </OptionBox>

        <OptionBox>
          <Title
            onClick={() =>
              getLogos(props.logoData.logoMarkColor, imgRef, canvasRef)
            }
          >
            <ColorMarkIcon height="36px" width="36px" className="lefticon" />
            <p>Color Logomark</p>
          </Title>
          <Buttons>
            <li>
              <Button
                onClick={() =>
                  getLogos(props.logoData.logoMarkColor, imgRef, canvasRef)
                }
              >
                <ShuffleIcon height="12px" width="12px" />
              </Button>
            </li>
            <li>
              <Button onClick={() => onClickIcon("colorlogomark")}>
                <ListIcon height="12px" width="12px" />
              </Button>
            </li>
          </Buttons>
        </OptionBox>

        <OptionBox>
          <Title
            onClick={() =>
              getLogos(props.logoData.logoMarkBW, imgRef, canvasRef)
            }
          >
            <BlackMarkIcon height="36px" width="36px" className="lefticon" />
            <p>B/W Logomark</p>
          </Title>
          <Buttons>
            <li>
              <Button
                onClick={() =>
                  getLogos(props.logoData.logoMarkBW, imgRef, canvasRef)
                }
              >
                <ShuffleIcon height="12px" width="12px" />
              </Button>
            </li>
            <li>
              <Button onClick={() => onClickIcon("blacklogomark")}>
                <ListIcon height="12px" width="12px" />
              </Button>
            </li>
          </Buttons>
        </OptionBox>
        <OptionBox>
          <Title
            onClick={() =>
              getLogos(props.logoData.brandLogos, imgRef, canvasRef)
            }
          >
            <BrandIcon height="36px" width="36px" className="lefticon" />
            <p>Brand Logos</p>
          </Title>
          <Buttons>
            <li>
              <Button
                onClick={() =>
                  getLogos(props.logoData.brandLogos, imgRef, canvasRef)
                }
              >
                <ShuffleIcon height="12px" width="12px" />
              </Button>
            </li>
            <li>
              <Button onClick={() => onClickIcon("brandlogos")}>
                <ListIcon height="12px" width="12px" />
              </Button>
            </li>
          </Buttons>
        </OptionBox>
        <OptionBox>
          <Title
            onClick={() => getLogos(props.logoData.flags, imgRef, canvasRef)}
          >
            <FlagIcon height="36px" width="36px" className="lefticon" />
            <p>Country Flags </p>
          </Title>
          <Buttons>
            <li>
              <Button
                onClick={() =>
                  getLogos(props.logoData.flags, imgRef, canvasRef)
                }
              >
                <ShuffleIcon height="12px" width="12px" />
              </Button>
            </li>
            <li>
              <Button onClick={() => onClickIcon("flags")}>
                <ListIcon height="12px" width="12px" />
              </Button>
            </li>
          </Buttons>
        </OptionBox>
      </HomeMenu>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <img ref={imgRef} style={{ display: "none" }} />
      <Footer />
    </>
  );
};

export default Home;

const HomeMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2px 0;
  cursor: pointer;
  :hover {
    background: var(--list-hover-bg);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 12px;
  .lefticon {
    margin-right: 12px;
  }
  p {
    color: var(--figma-color-text);
    font-weight: 500;
    font-size: 15px;
    margin: 0;
  }
`;

const Buttons = styled.ul`
  padding: 8px 8px 8px 0;
  display: flex;
  margin: 0;
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    > div {
      display: none;
    }
    &:hover {
      > div {
        display: flex;
      }
    }
  }
`;

const Button = styled.a`
  line-height: normal;
  padding: 12px;
  opacity: 0.6;
  border-radius: 2px;
  display: block;
  :hover {
    background: var(--figma-color-bg-hover);
    opacity: 1;
  }
  svg path {
    fill: var(--svg-fill-color);
  }
`;

const ToolTip = styled.div`
  z-index: 100;
  display: flex;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 16px;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
  color: rgb(255, 255, 255);
  position: absolute;
  top: calc(100% + 1ch);
  &.r {
    right: 0;
  }
  .nib-l {
    position: absolute;
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
    top: -4px;
    left: 12px;
  }
  .nib-r {
    position: absolute;
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
    top: -4px;
    right: 12px;
  }
  .text {
    align-self: start;
    border: 0.5px solid rgb(0, 0, 0);
    box-sizing: border-box;
    border-radius: 2px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 4px 8px;
    background-color: rgb(34, 34, 34);
  }
`;

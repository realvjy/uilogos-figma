import * as React from "react";

import theme from "../theme";

import styled from "styled-components";
import { ListIcon, ShuffleIcon } from "../components/icons";
import {
  BlackMarkIcon,
  BlackTypeIcon,
  ColorMarkIcon,
  ColorTypeIcon,
  FlagIcon,
} from "../components/logos-icons";
import Footer from "../components/footer";

declare function require(path: string): any;

const Home = (props) => {
  const [currentPage, setCurrentPage] = React.useState("home");
  console.log(props);
  const onClickIcon = (event) => {
    props.parentCallback(event);
  };

  return (
    <>
      <HomeMenu>
        <OptionBox>
          <Title>
            <ColorTypeIcon height="36px" width="36px" className="lefticon" />
            <p>Color Logotype</p>
          </Title>
          <Buttons>
            <Button>
              <ShuffleIcon height="12px" width="12px" />
            </Button>
            <Button onClick={() => onClickIcon("colorlogotype")}>
              <ListIcon height="12px" width="12px" />
            </Button>
          </Buttons>
        </OptionBox>

        <OptionBox>
          <Title>
            <BlackTypeIcon height="36px" width="36px" className="lefticon" />
            <p>B/W Logotype</p>
          </Title>
          <Buttons>
            <Button>
              <ShuffleIcon height="12px" width="12px" />
            </Button>
            <Button onClick={() => onClickIcon("blacklogotype")}>
              <ListIcon height="12px" width="12px" />
            </Button>
          </Buttons>
        </OptionBox>

        <OptionBox>
          <Title>
            <ColorMarkIcon height="36px" width="36px" className="lefticon" />
            <p>Color Logomark</p>
          </Title>
          <Buttons>
            <Button>
              <ShuffleIcon height="12px" width="12px" />
            </Button>
            <Button onClick={() => onClickIcon("colorlogomark")}>
              <ListIcon height="12px" width="12px" />
            </Button>
          </Buttons>
        </OptionBox>

        <OptionBox>
          <Title>
            <BlackMarkIcon height="36px" width="36px" className="lefticon" />
            <p>B/W Logomark</p>
          </Title>
          <Buttons>
            <Button>
              <ShuffleIcon height="12px" width="12px" />
            </Button>
            <Button onClick={() => onClickIcon("blacklogomark")}>
              <ListIcon height="12px" width="12px" />
            </Button>
          </Buttons>
        </OptionBox>

        <OptionBox>
          <Title>
            <FlagIcon height="36px" width="36px" className="lefticon" />
            <p>Country Flags</p>
          </Title>
          <Buttons>
            <Button>
              <ShuffleIcon height="12px" width="12px" />
            </Button>
            <Button onClick={() => onClickIcon("flags")}>
              <ListIcon height="12px" width="12px" />
            </Button>
          </Buttons>
        </OptionBox>
      </HomeMenu>
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

const Buttons = styled.div`
  padding: 8px 8px 8px 0;
  display: flex;
`;

const Button = styled.a`
  line-height: normal;
  padding: 12px;
  opacity: 0.6;
  border-radius: 2px;
  :hover {
    background: var(--figma-color-bg-hover);
    opacity: 1;
  }
  svg path {
    fill: var(--svg-fill-color);
  }
`;

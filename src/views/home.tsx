import * as React from "react";

import theme from "../theme";
import styled from "styled-components";
import { ListIcon, ShuffleIcon } from "../components/icons";
import { ColorMarkIcon, ColorTypeIcon } from "../components/logos-icons";

declare function require(path: string): any;

const Home = (props) => {
  // const iconData = props;
  // const { name } = props;

  // const [results, setResults] = React.useState(icons);
  const uiLogosUrl = "https://uilogos.co/uilogos/uilogos.json";
  const loadData = () => JSON.parse(JSON.stringify(uiLogosUrl));

  const getAllLogos = async () => {
    const response = await fetch(uiLogosUrl);
    const jsonData = await response.json();
    return jsonData;
  };

  return (
    <>
      <span className="icon-box">
        <ColorTypeIcon />
      </span>
      <span className="title-box">Color Logotype</span>
      <span className="option-box">
        <ShuffleIcon /> <ListIcon />
      </span>
      <span className="icon-box">
        <ColorMarkIcon />
      </span>
      <span className="title-box">Color Logotype</span>
      <span className="option-box">
        <ShuffleIcon /> <ListIcon />
      </span>
    </>
  );
};

export default Home;

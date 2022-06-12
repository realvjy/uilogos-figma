import * as React from "react";
import styled from "styled-components";
import { BackIcon } from "./icons";
import theme from "../theme";

interface Props {
  title: String;
}

const MentuTitle = (props) => {
  const onClickIcon = (event) => {
    props.parentCallback(event);
  };

  return (
    <NavBar className="menu-title">
      <span className="icon-box">
        <a href="#">
          <BackIcon
            height="12px"
            width="12px"
            onClick={() => onClickIcon("home")}
          />
        </a>
      </span>
      {props.title}
    </NavBar>
  );
};

export default MentuTitle;

const NavBar = styled.div`
  background-color: var(--figma-color-bg);
  color: var(--figma-color-text);
  font-size: 13px;
  font-weight: 600;
  position: sticky;
  z-index: 1;
  top: 0;
  border-bottom: 1px solid var(--figma-color-border);
  input {
    width: 100%;
    height: 40px;
    padding: 0 ${theme.space[4]} 0 36px;
    font-family: inherit;
    background-color: var(--figma-color-bg);
    color: var(--figma-color-text);
    border: 0;
    outline: 0;
    :focus {
      box-shadow: none;
    }
  }
  a {
    display: inline-block;
    padding: 12px;
    margin-right: 4px;
    svg path {
      fill: var(--svg-fill-color);
    }
  }
`;

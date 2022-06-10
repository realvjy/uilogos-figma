import * as React from "react";
import Back from "../asset/Back";

interface Props {
  title: String;
}

const MentuTitle = (props: Props) => {
  return (
    <div className="menu-title">
      <span className="icon-box">
        <a href="#">
          <Back />
        </a>
      </span>
      <span className="menu-text">{props.title}</span>
    </div>
  );
};

export default MentuTitle;

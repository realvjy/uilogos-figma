import React from "react";
import axios from "axios";

import ColorMarkIcon from "../../asset/color-mark";
import BlackMarkIcon from "../../asset/black-mark";
import ColorTypeIcon from "../../asset/color-type";
import BlackTypeIcon from "../../asset/black-type";
import FlagIcon from "../../asset/flag";
import Dots from "../../asset/dots";
import MenuTitle from "../../components/menu-title";

const uiLogosUrl = "https://uilogos.co/uilogos/uilogos.json";
const loadData = () => JSON.parse(JSON.stringify(uiLogosUrl));

const getAllLogosWithAxios = async () => {
  const response = await axios.get(uiLogosUrl);
  console.log(response);
};

const BlackLogomark = () => {
  return (
    <div className="content-panel" id="color-logomark">
      <MenuTitle title="Color Logomark" />

      <div className="logos-container">
        <div className="logos mark">
          <div className="logo-wrap">
            <div className="square-logo">
              <img
                src="https://uilogos.co/uilogos/mark/color/a-lab.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="logos mark">
          <div className="logo-wrap">
            <div className="square-logo">
              <img
                src="https://uilogos.co/uilogos/mark/color/a-lab.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="logos mark">
          <div className="logo-wrap">
            <div className="square-logo">
              <img
                src="https://uilogos.co/uilogos/mark/color/a-lab.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="logos mark">
          <div className="logo-wrap">
            <div className="square-logo">
              <img
                src="https://uilogos.co/uilogos/mark/color/a-lab.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="logos mark">
          <div className="logo-wrap">
            <div className="square-logo">
              <img
                src="https://uilogos.co/uilogos/mark/color/a-lab.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="logos mark">
          <div className="logo-wrap">
            <div className="square-logo">
              <img
                src="https://uilogos.co/uilogos/mark/color/a-lab.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="logos mark">
          <div className="logo-wrap">
            <div className="square-logo">
              <img
                src="https://uilogos.co/uilogos/mark/color/a-lab.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackLogomark;

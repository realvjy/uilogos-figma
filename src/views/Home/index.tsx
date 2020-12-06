import React from 'react';

import ColorMarkIcon from '../../asset/color-mark'
import BlackMarkIcon from '../../asset/black-mark'
import ColorTypeIcon from '../../asset/color-type'
import BlackTypeIcon from '../../asset/black-type'
import FlagIcon from '../../asset/flag'
import Dots from '../../asset/dots'




const Home = () => {
  const uiLogosUrl= "https://uilogos.co/uilogos/uilogos.json";
  const loadData = () => JSON.parse(JSON.stringify(uiLogosUrl));
  
  
  const getAllLogos = async () => {
    const response = await fetch(uiLogosUrl);
    const jsonData = await response.json();
    return jsonData;
  };
  

  return (
    <div className="content-panel" id="home-view">
      { console.log(getAllLogos())}
      <div
        className="content-menu"
        id="colortype"
        onClick={() => parent.postMessage({ pluginMessage: { type: name } }, '*')}
      >
        <span className="icon-box">
          <ColorTypeIcon />
        </span>
        <span className="title-box">
          Color Logotype
      </span>
        <span className="option-box">
          <Dots />
        </span>
      </div>

      <div className="content-menu" id="blacktype">
        <span className="icon-box">
          <BlackTypeIcon />
        </span>
        <span className="title-box">
          Black Logotype
      </span>
        <span className="option-box">
          <Dots />
        </span>
      </div>

      <div className="content-menu" id="colormark">
        <span className="icon-box">
          <ColorMarkIcon />
        </span>
        <span className="title-box">
          Color Mark
      </span>
        <span className="option-box">
          <Dots />
        </span>
      </div>

      <div className="content-menu" id="blackmark">
        <span className="icon-box">
          <BlackMarkIcon />
        </span>
        <span className="title-box">
          Black Mark
      </span>
        <span className="option-box">
          <Dots />
        </span>
      </div>

      <div className="content-menu" id="country-flag">
        <span className="icon-box">
          <FlagIcon />
        </span>
        <span className="title-box">
          Country Flag
      </span>
        <span className="option-box">
          <Dots />
        </span>
      </div>
    </div>
  );
}


export default Home;

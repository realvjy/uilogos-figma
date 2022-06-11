import * as React from "react";
import * as ReactDOM from "react-dom";

import Footer from "./components/footer";
import Home from "./views/home";
import ColorLogomark from "./views/ColorLogomark";
import BlackLogomark from "./views/BlackLogomark";
import ColorLogotype from "./views/ColorLogotype";
import BlackLogotype from "./views/BlackLogotype";
import CountryFlag from "./views/CountryFlag";

import "./ui.css";

declare function require(path: string): any;

const App = () => {
  const [currentPage] = React.useState("home");

  const [uiLogos, setUILogos] = React.useState([]);

  const [fullLogosColor, setFullLogosColor] = React.useState([]);
  const [fullLogosBW, setFullLogosBW] = React.useState([]);

  const [logoMarkColor, setLogoMarkColor] = React.useState([]);
  const [logoMarkBW, setLogoMarkBW] = React.useState([]);

  const [flags, setFlags] = React.useState([]);

  const uiLogosUrl = "https://uilogos.co/uilogos/uilogos.json";
  const fetchData = async () => {
    try {
      const response = await fetch(uiLogosUrl);
      const json = await response.json();
      setFullLogosColor(json.uilogos["full-logo"]["color"]);
      setFullLogosBW(json.uilogos["full-logo"]["black"]);
      setLogoMarkColor(json.uilogos["mark"]["color"]);
      setLogoMarkBW(json.uilogos["mark"]["black"]);
      setFlags(json.uilogos["flags"]["all-flags"]);
    } catch (error) {
      console.log("error", error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  // const { name } = props;

  // const [results, setResults] = React.useState(icons);

  // console.log(Object.values(uiLogos));

  // console.log(flags);
  // console.log(logoMarks);

  // flags.map((flag) => {
  //   console.log(flag.Name);
  // });

  function onWindowResize(windowSize: { width: number; height: number }) {
    parent.postMessage(
      {
        pluginMessage: {
          type: "window-resize",
          data: { width: windowSize.width, height: windowSize.height },
        },
      },
      "*"
    );
  }
  // useWindowResize(onWindowResize, {
  //   minWidth: 120,
  //   minHeight: 120,
  //   maxWidth: 1024,
  //   maxHeight: 1024,
  // });

  const renderPage = () => {
    switch (currentPage) {
      default:
      case "home":
        // return <ColorLogomark logoData={logoMarkColor} />;
        // return <BlackLogomark logoData={logoMarkBW} />;
        // return <ColorLogotype logoData={fullLogosColor} />;
        // return <BlackLogotype logoData={fullLogosBW} />;
        // return <CountryFlag logoData={flags} />;
        return <Home />;
    }
  };

  return renderPage();
};

ReactDOM.render(<App />, document.getElementById("react-page"));

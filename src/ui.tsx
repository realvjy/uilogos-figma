import * as React from "react";
import * as ReactDOM from "react-dom";

import Home from "./views/home";
import "./ui.css";
import LogoList from "./views/logos-list";

declare function require(path: string): any;

const App = (props) => {
  const [currentPage, setCurrentPage] = React.useState("home");

  const handleCallback = (pageType) => {
    setCurrentPage(pageType);
  };

  const [fullLogosColor, setFullLogosColor] = React.useState([]);
  const [fullLogosBW, setFullLogosBW] = React.useState([]);

  const [logoMarkColor, setLogoMarkColor] = React.useState([]);
  const [logoMarkBW, setLogoMarkBW] = React.useState([]);

  const [flags, setFlags] = React.useState([]);
  const [brandLogos, setBrandLogos] = React.useState([]);

  const uiLogosUrl = "https://uilogos.co/uilogos/uilogos.json";

  const fetchData = async () => {
    try {
      const response = await fetch(uiLogosUrl);
      const json = await response.json();

      // Set logostypes
      setFullLogosColor(json.uilogos["full-logo"]["color"]);
      setFullLogosBW(json.uilogos["full-logo"]["black"]);
      setLogoMarkColor(json.uilogos["mark"]["color"]);
      setLogoMarkBW(json.uilogos["mark"]["black"]);
      setBrandLogos(json.uilogos["brand"]["color"]);
      setFlags(json.uilogos["flags"]["all-flags"]);
    } catch (error) {
      console.log("error", error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  // Not in use
  //@ts-ignore
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

  const renderPage = () => {
    switch (currentPage) {
      default:
      case "home":
        return (
          <Home
            parentCallback={handleCallback}
            logoData={{
              fullLogosBW: fullLogosBW,
              fullLogosColor: fullLogosColor,
              logoMarkBW: logoMarkBW,
              logoMarkColor: logoMarkColor,
              flags: flags,
              brandLogos: brandLogos,
            }}
          />
        );
      case "colorlogotype":
        return (
          <LogoList
            class={"grid-3 logotype"}
            title={"Color Logotype"}
            logoData={fullLogosColor}
            parentCallback={handleCallback}
          />
        );
      case "blacklogotype":
        return (
          <LogoList
            class={"grid-3 logotype"}
            title={"B/W Logotype"}
            logoData={fullLogosBW}
            parentCallback={handleCallback}
          />
        );
      case "colorlogomark":
        return (
          <LogoList
            class={"grid-4"}
            title={"Color Logomark"}
            logoData={logoMarkColor}
            parentCallback={handleCallback}
          />
        );
      case "blacklogomark":
        return (
          <LogoList
            class={"grid-4"}
            title={"B/W Logomark"}
            logoData={logoMarkBW}
            parentCallback={handleCallback}
          />
        );
      case "brandlogos":
        return (
          <LogoList
            class={"grid-3 logotype"}
            title={"Brand Logos"}
            logoData={brandLogos}
            parentCallback={handleCallback}
          />
        );
      case "flags":
        return (
          <LogoList
            class={"grid-4"}
            title={"Country Flags"}
            logoData={flags}
            parentCallback={handleCallback}
          />
        );
    }
  };

  return renderPage();
};

ReactDOM.render(<App />, document.getElementById("react-page"));

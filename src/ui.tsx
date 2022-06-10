import * as React from "react";
import * as ReactDOM from "react-dom";

import Footer from "./components/footer";
import Home from "./views/home";
import ColorLogomark from "./views/ColorLogomark";
import BlackLogomark from "./views/BlackLogomark";
import ColorLogotype from "./views/ColorLogotype";
import CountryFlag from "./views/CountryFlag";

import "./ui.css";

declare function require(path: string): any;

const App = () => {
  const [currentPage] = React.useState("home");

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
        return <Home />;
    }
  };

  return renderPage();
};

ReactDOM.render(<App />, document.getElementById("react-page"));

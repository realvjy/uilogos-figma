import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Logo from './asset/logo'
import ColorMarkIcon from './asset/color-mark'
import BlackMarkIcon from './asset/black-mark'
import ColorTypeIcon from './asset/color-type'
import BlackTypeIcon from './asset/black-type'
import FlagIcon from './asset/flag'
import Dots from './asset/dots'


import './ui.scss'

declare function require(path: string): any

class App extends React.Component {

  render() {
    return <main>
      <div className="app">
        <div className="content-panel">

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
      </div>
      <footer>
        <div className="footer-credit">
          <span className="logo">
            <a target="_blank" href="https://uilogos.co"><Logo /></a>
          </span>
          <span className="name">
            made by <a target="_blank" href="https://twitter.com/realvjy">vijay verma.</a>
          </span>
        </div>
      </footer>
    </main>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
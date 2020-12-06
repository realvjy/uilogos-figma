import * as React from 'react'
import * as ReactDOM from 'react-dom'


import Footer from './components/footer'
import Home from './views/Home'
import ColorLogomark from './views/ColorLogomark'
import BlackLogomark from './views/BlackLogomark'
import ColorLogotype from './views/ColorLogotype'
import CountryFlag from './views/CountryFlag'

import './ui.scss'

declare function require(path: string): any

class App extends React.Component {

  render() {
    return <main>
      <div className="app">
        <Home />
        <Footer />
      </div>
    </main>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
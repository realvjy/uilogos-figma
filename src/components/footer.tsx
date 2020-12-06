import React from 'react';
import Logo from '../asset/logo'


const Footer = () => {
  return (
    <footer>
      <div className="footer-credit">
        <span className="logo">
          <a target="_blank" href="https://uilogos.co"><Logo /></a> v0.1
          </span>
        <span className="name">
          made by <a target="_blank" href="https://twitter.com/realvjy">vijay verma.</a>
        </span>
      </div>
    </footer>
  );
}


export default Footer;

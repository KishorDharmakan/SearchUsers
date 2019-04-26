import React from "react";

const Footer = props => {
  return (
    <footer className="footer-style">
      <p className="text-center">
        <a href="mailto:abcd@gmail.com" >
          Click for help?
        </a>
        <span> / </span>
        <a href="https://twitter.com/Tweet">
          Our Twitter Feed
        </a>
      </p>
      <p className="copyright">
        &copy; 2019 - ABCD
      </p>
    </footer>
  );
};

export default Footer;

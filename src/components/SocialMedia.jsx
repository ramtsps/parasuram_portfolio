import React from "react";
import { BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <a href="https://www.linkedin.com/in/parasu-ram/" target="__blank">
        <BsLinkedin />
      </a>
      <a href="https://github.com/ramtsps" target="__blank">
        <BsGithub />
      </a>
      <a href="https://www.instagram.com/parasu_.ram/" target="__blank">
        <BsInstagram />
      </a>
    </div>
  );
};

export default SocialMedia;

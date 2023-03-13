import React, { Fragment, memo } from "react";
import FooterAbout from "./footer-about/FooterAbout";
import FooterInfo from "./footer-info/FooterInfo";
import ScrollUp from "./footer-scoll_up";

const Footer = () => {
  return (
    <Fragment>
      <div className="transition-all">
        <FooterInfo />
        <FooterAbout />
        <ScrollUp />
      </div>
    </Fragment>
  );
};

export default memo(Footer);

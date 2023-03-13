import React from "react";
import "./Overlay.css";

interface OverlayProps {
  optionPopup?: boolean;
  navbarActive?: boolean;
}

function Overlay({ optionPopup, navbarActive }: OverlayProps) {
  return <div className={"overlay " + (optionPopup || navbarActive ? "overlay-active" : "")} />;
}

export default Overlay;

import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

FancyButton.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

function FancyButton(props) {
  const { title, width, height, onClick } = props;

  const handleOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!onClick) return;
    onClick();
  };
  return (
    <a
      href="#!"
      className="btn"
      style={{
        width: width || "auto",
        height: height || "auto",
      }}
      onClick={handleOnClick}
    >
      {title}
      <span className="border border-top"></span>
      <span className="border border-left"></span>
      <span className="border border-bottom"></span>
      <span className="border border-right"></span>
    </a>
  );
}

export default FancyButton;

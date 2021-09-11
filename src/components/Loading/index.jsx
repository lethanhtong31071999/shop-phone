import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

Loading.propTypes = {};

function Loading(props) {
  return (
    <div className="wrapper-loading-page">
      <div class="bouncer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;

import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

ToastMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  title: PropTypes.string,
};

function ToastMessage({ type = "success", title = "", message = "" }) {
  const getColor = () => {
    let color = "#ccc";
    switch (type) {
      case "success": {
        color = "green";
        break;
      }

      case "error": {
        color = "red";
        break;
      }

      case "infor": {
        color = "lightblue";
        break;
      }
      default:
        break;
    }
    return color;
  };

  return (
    <div className="toast" style={{ "--primaryColor": getColor() }}>
      <h4>Hello</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
        vel?
      </p>
    </div>
  );
}

export default ToastMessage;

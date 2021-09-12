import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

Modal.propTypes = {
  initialOpen: PropTypes.bool,
};

function Modal({ isShowModal = false, openModal = () => {} }) {
  const [styles, setStyles] = useState({
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    minWidth: "100vw",
    minHeight: "100vh",

    "z-index": "10",

    display: "none",
  });

  useEffect(() => {
    const display = isShowModal ? "block" : "none";
    setStyles((state) => ({ ...state, display }));
  }, [isShowModal]);

  return <div style={styles} onClick={() => openModal()} />;
}

export default Modal;

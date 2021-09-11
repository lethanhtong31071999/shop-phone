import React from "react";
import PropTypes from "prop-types";
import TopAppBar from "./components/TopAppBar";
import NavAppBar from "./components/NavAppBar";
import { useState } from "react";

AppBar.propTypes = {};

const initailState = null;

function AppBar(props) {
  const [selectedMenu, setSelectedMenu] = useState(initailState);
  const handleOnChange = (selectedMenu) => {
    if (Number.isInteger(selectedMenu)) setSelectedMenu(selectedMenu);
    else setSelectedMenu(initailState);
  };
  return (
    <header>
      <TopAppBar onChange={handleOnChange} />
      <NavAppBar selectedMenu={selectedMenu} onChange={handleOnChange} />
    </header>
  );
}

export default AppBar;

import React from "react";
import PropTypes from "prop-types";
import TopAppBar from "./components/TopAppBar";
import NavAppBar from "./components/NavAppBar";
import { useState } from "react";

AppBar.propTypes = {
  onSearchSubmit: PropTypes.func,
  openModal: PropTypes.func,
};

const initailState = null;

function AppBar({ onSearchSubmit = null, openModal = () => {} }) {
  const [selectedMenu, setSelectedMenu] = useState(initailState);

  const handleOnChange = (selectedMenu) => {
    if (Number.isInteger(selectedMenu)) setSelectedMenu(selectedMenu);
    else setSelectedMenu(initailState);
  };

  function handleOnSearch(search) {
    if (!onSearchSubmit) return;
    onSearchSubmit(search);
  }

  return (
    <header>
      <TopAppBar
        onChange={handleOnChange}
        onSearch={handleOnSearch}
        openModal={(value) => openModal(value)}
      />
      <NavAppBar selectedMenu={selectedMenu} onNavChange={handleOnChange} />
    </header>
  );
}

export default AppBar;

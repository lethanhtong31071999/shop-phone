import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../../app/css/base.css";
import "./css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faLaptop,
  faTabletAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

NavAppBar.propTypes = {
  selectedMenu: PropTypes.number,
  onNavChange: PropTypes.func,
};

function NavAppBar({ selectedMenu = null, onNavChange = null }) {
  const items = [
    {
      id: 1,
      title: "Điện thoại",
      icon: faMobileAlt,
      link: "/phones",
    },
    {
      id: 2,
      title: "Laptop",
      icon: faLaptop,
      link: "/laptops",
    },
    {
      id: 3,
      title: "Tablet",
      icon: faTabletAlt,
      link: "/tablets",
    },
    {
      id: 4,
      title: "Đồng hồ thông minh",
      icon: faClock,
      link: "/watches",
    },
  ];

  const isActive = (id) => {
    if (id === selectedMenu) return true;
    return false;
  };

  const handleOnClickCategory = (id) => {
    if (!onNavChange) return;
    onNavChange(id);
  };

  return (
    <div className="container-fluid header__nav ">
      <div className="container">
        <ul className="header__nav-list">
          {items.map((item) => (
            <li
              key={item.id}
              className={
                isActive(item.id)
                  ? "header__nav-item active"
                  : "header__nav-item"
              }
              onClick={() => handleOnClickCategory(item.id)}
            >
              <NavLink to={item.link} key={item.id}>
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavAppBar;

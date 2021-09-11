import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

TypePhoneFilter.propTypes = {
  data: PropTypes.array,
  visible: PropTypes.bool,
  onChange: PropTypes.func,
};

function TypePhoneFilter({ data = [], visible = false, onChange = null }) {
  const classNameUl = visible
    ? "filter__phone-type clicked"
    : "filter__phone-type";

  const colorList = [
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#3f51b5",
    "#673ab7",
    "#9c27b0",
    "#ff9800",
    "#f44336",
    "#795548",
    "#607d8b",
  ];
  const randomColor = () => {
    const randomIndex = Math.trunc(Math.random() * colorList.length);
    return {
      backgroundColor: colorList[randomIndex],
    };
  };

  const handleOnClick = (e, type) => {
    e.stopPropagation();
    if (!onChange) return;
    onChange(type);
  };

  return data.length > 0 ? (
    <ul className={classNameUl}>
      {data.map((type) => (
        <li
          key={type.id}
          style={randomColor()}
          onClick={(e) => handleOnClick(e, type)}
        >
          <span>{type.name}</span>
        </li>
      ))}
    </ul>
  ) : null;
}

export default TypePhoneFilter;

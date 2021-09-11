import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

SortPriceFilterComponent.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  visible: PropTypes.bool,
};

function SortPriceFilterComponent(props) {
  const { data = [], onChange = {}, visible = false } = props;

  const classNameUl = visible
    ? "filter__price-sort clicked"
    : "filter__price-sort";

  const handleOnClick = (e, item) => {
    e.stopPropagation();
    if (!onChange) return;
    onChange(item);
  };

  return data.length > 0 ? (
    <ul className={classNameUl}>
      {data.map((item) => (
        <li key={item.id} onClick={(e) => handleOnClick(e, item)}>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  ) : null;
}

export default SortPriceFilterComponent;

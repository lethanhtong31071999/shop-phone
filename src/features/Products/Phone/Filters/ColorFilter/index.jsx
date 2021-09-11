import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "../../../../../../node_modules/@fortawesome/react-fontawesome/index";
import {
  faChevronDown,
  faChevronUp,
} from "../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import SortPriceFilterComponent from "../../components/SortPriceFilter/index";

ColorFilter.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
  colors: PropTypes.array,
};
const initalTitle = "Màu sắc";

function ColorFilter(props) {
  const { filters = {}, onChange = null, colors = [] } = props;
  const [isClick, setIsClick] = useState(false);
  const [title, setTitle] = useState(initalTitle);

  const data = colors.map((color, index) => ({
    id: index,
    name: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ flex: 1 }}>{color.name}</span>
        <span
          className="color-spot"
          style={{
            display: "inline-block",
            background: color.value,
            marginLeft: "1rem",
            width: "1rem",
            height: "1rem",
            border: "1px solid #ccc",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    value: color.value,
  }));

  data.push({
    id: data.length + 1,
    name: "Tất cả",
    value: "all",
  });

  const handleOnChange = (item) => {
    if (!onChange) return;
    const cloneFilters = { ...filters, "colors.value": item.value };

    if (item.value === "all") {
      delete cloneFilters["colors.value"];
      setTitle(initalTitle);
    } else setTitle(item.name);
    onChange(cloneFilters);
  };

  return (
    <li onClick={() => setIsClick((state) => !state)}>
      <span className="filter__phone-title">{title}</span>
      <i>
        <FontAwesomeIcon icon={isClick ? faChevronUp : faChevronDown} />
      </i>
      <SortPriceFilterComponent
        data={data}
        onChange={handleOnChange}
        visible={isClick}
      />
    </li>
  );
}

export default ColorFilter;

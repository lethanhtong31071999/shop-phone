import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "../../../../../../node_modules/@fortawesome/react-fontawesome/index";
import {
  faChevronDown,
  faChevronUp,
} from "../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import SortPriceFilterComponent from "../../components/SortPriceFilter/index";

SortPriceFilter.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const initalTitle = "Giá giảm dần";

function SortPriceFilter(props) {
  const { filters, onChange } = props;
  const [isClick, setIsClick] = useState(false);
  const [title, setTitle] = useState(initalTitle);

  const data = [
    {
      id: 1,
      name: "Giá tăng dần",
      value: "asc",
    },
    { id: 2, name: "Giá giảm dần", value: "desc" },
  ];

  const handleOnChange = (item) => {
    setTitle(item.name);
    const cloneFilters = { ...filters, _order: item.value };
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

export default SortPriceFilter;

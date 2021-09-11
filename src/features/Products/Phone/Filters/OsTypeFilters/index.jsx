import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "../../../../../../node_modules/@fortawesome/react-fontawesome/index";
import {
  faChevronDown,
  faChevronUp,
} from "../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import SortPriceFilterComponent from "../../components/SortPriceFilter/index";
import { useState } from "react";

OsTypeFilter.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};
const initalTitle = "Hệ điều hành";

function OsTypeFilter(props) {
  const { onChange, filters } = props;
  const [isClick, setIsClick] = useState(false);
  const [title, setTitle] = useState(initalTitle);

  const data = [
    {
      id: 1,
      name: "IOS",
      value: "IOS",
    },
    {
      id: 2,
      name: "Android",
      value: "Android",
    },
    {
      id: 3,
      name: "Tất cả",
      value: "all",
    },
  ];

  const handleOnChange = (item) => {
    if (!onChange) return;
    const cloneFilters = { ...filters, osTypes: item.value };

    if (item.value === "all") {
      delete cloneFilters["osTypes"];
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

export default OsTypeFilter;

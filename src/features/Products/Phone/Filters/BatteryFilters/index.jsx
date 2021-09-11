import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "../../../../../../node_modules/@fortawesome/react-fontawesome/index";
import {
  faChevronDown,
  faChevronUp,
} from "../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import { useState } from "react";
import SortPriceFilterComponent from "../../components/SortPriceFilter/index";

BatteryFilter.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const initalTitle = "Dung lượng pin";

function BatteryFilter(props) {
  const { filters, onChange } = props;
  const [isClick, setIsClick] = useState(false);
  const [title, setTitle] = useState(initalTitle);

  const data = [
    {
      id: 1,
      name: "Lớn hơn 1000",
      value: "1000",
    },
    {
      id: 2,
      name: "Lớn hơn 1500",
      value: "1500",
    },
    {
      id: 3,
      name: "Lớn hơn 2000",
      value: "2000",
    },
    {
      id: 4,
      name: "Lớn hơn 4000",
      value: "4000",
    },
    {
      id: 5,
      name: "Tất cả",
      value: "all",
    },
  ];

  const handleOnChange = (item) => {
    if (!onChange) return;
    const cloneFilters = { ...filters, batteries_gte: item.value };

    if (item.value === "all") {
      delete cloneFilters["batteries_gte"];
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

export default BatteryFilter;

import PropTypes from "prop-types";
import React from "react";
import BatteryFilter from "./BatteryFilters/index";
import ColorFilter from "./ColorFilter/index";
import FilterByPhoneType from "./FilterByPhoneType/index";
import MemoryFilter from "./MemoryFilters/index";
import OsTypeFilter from "./OsTypeFilters/index";
import SortPriceFilter from "./SortPriceFilter/index";
import "./styles.css";

PhoneFilter.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

PhoneFilter.defaultProps = {
  filters: {},
  onChange: null,
};

function PhoneFilter({ filters, onChange, colors }) {
  const handleOnChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };

  return (
    <ul className="filter__phone">
      <FilterByPhoneType filters={filters} onChange={handleOnChange} />
      <SortPriceFilter filters={filters} onChange={handleOnChange} />
      <MemoryFilter filters={filters} onChange={handleOnChange} />
      <BatteryFilter filters={filters} onChange={handleOnChange} />
      <OsTypeFilter filters={filters} onChange={handleOnChange} />
      <ColorFilter
        filters={filters}
        onChange={handleOnChange}
        colors={colors}
      />
    </ul>
  );
}

export default PhoneFilter;

import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "../../../../../../node_modules/@fortawesome/react-fontawesome/index";
import {
  faChevronDown,
  faChevronUp,
  faChevronRight,
} from "../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import SortPriceFilterComponent from "../../components/SortPriceFilter/index";
import "./styles.css";
import { useEffect } from "react";

MemoryFilter.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const initalTitle = "Ram và Rom";

function MemoryFilter(props) {
  const { filters, onChange } = props;
  const [title, setTitle] = useState(initalTitle);
  const [visible, setVisible] = useState(false);

  const rams = ["4GB", "6GB", "8GB", "12GB", "16GB"];
  const roms = ["64GB", "128GB", "256GB", "512GB"];

  const handleRamChange = (e, data, name) => {
    e.stopPropagation();
    if (!onChange) return;

    if (name === "all") {
      const cloneFilters = { ...filters };
      delete cloneFilters["ram"];
      delete cloneFilters["rom"];
      setTitle(initalTitle);
      onChange(cloneFilters);
    } else {
      const cloneFilters = { ...filters, [name]: data };
      onChange(cloneFilters);
    }
  };

  useEffect(() => {
    const ramTitle = `${filters.ram || ""}Ram`;
    const romTitle = `${filters.rom || ""}Rom`;
    setTitle(`${ramTitle}/${romTitle}`);
  }, [filters]);

  return (
    <li onClick={() => setVisible((state) => !state)}>
      <span className="filter__phone-title">{title}</span>
      <i>
        <FontAwesomeIcon icon={visible ? faChevronUp : faChevronDown} />
      </i>
      <ul
        className={
          visible ? "filter__memory-filter clicked" : "filter__memory-filter"
        }
      >
        <li>
          <span>Ram</span>
          <i>
            <FontAwesomeIcon icon={faChevronRight} />
          </i>
          <ul className="filter__memory-ram">
            {rams.map((ram) => (
              <li onClick={(e) => handleRamChange(e, ram, "ram")}>{ram}</li>
            ))}
          </ul>
        </li>
        <li>
          <span>Rom</span>
          <i>
            <FontAwesomeIcon icon={faChevronRight} />
          </i>
          <ul className="filter__memory-rom">
            {roms.map((rom) => (
              <li onClick={(e) => handleRamChange(e, rom, "rom")}>{rom}</li>
            ))}
          </ul>
        </li>
        <li onClick={(e) => handleRamChange(e, "", "all")}>
          <span>Tất cả</span>
        </li>
      </ul>
    </li>
  );
}

export default MemoryFilter;

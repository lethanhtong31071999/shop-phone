import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "../../../../../../node_modules/@fortawesome/react-fontawesome/index";
import TypePhoneFilter from "../../components/PhoneTypeFilter/index";
import { useState } from "react";
import {
  faChevronDown,
  faChevronUp,
} from "../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import { useEffect } from "react";
import phoneTypesApi from "api/Phone/phoneTypesApi";

FilterByPhoneType.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
  item: PropTypes.object,
};

const initalTitle = "Hãng";

function FilterByPhoneType(props) {
  const { filters, onChange } = props;
  const [isClick, setIsClick] = useState(false);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(initalTitle);

  useEffect(() => {
    try {
      (async () => {
        const res = await phoneTypesApi.getAll();
        res.push({
          id: res.length,
          name: "Tất cả",
          value: "All",
          country: "",
        });
        setData(res);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOnChangeByType = (type) => {
    if (!onChange) return;

    const cloneFilters = { ...filters };
    cloneFilters["phoneTypesId"] = type.id;

    if (type.value === "All") {
      setTitle(initalTitle);
      delete cloneFilters["phoneTypesId"];
    } else setTitle(type.name);

    onChange(cloneFilters);
  };

  return (
    <li onClick={() => setIsClick((state) => !state)}>
      <span className="filter__phone-title">{title}</span>
      <i>
        <FontAwesomeIcon icon={isClick ? faChevronUp : faChevronDown} />
      </i>
      <TypePhoneFilter
        visible={isClick}
        data={data}
        onChange={handleOnChangeByType}
      />
    </li>
  );
}

export default FilterByPhoneType;

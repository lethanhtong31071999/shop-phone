import React from "react";
import PropTypes from "prop-types";
import PhoneFilter from "./Filters";
import PhoneList from "./pages/PhoneList";
import { useState } from "react";
import { useEffect } from "react";
import phoneApi from "api/Phone/phoneApi";
import Pagination from "components/Pagination/index";
import Loading from "components/Loading/index";

PhonePage.propTypes = {
  searchTerm: PropTypes.string,
};

const getColors = (products = []) => {
  if (products.length <= 0) return [];

  const colorArr = [];
  products.forEach((p) => {
    colorArr.push(p.colors);
  });

  const valueColorArr = colorArr.map((color) => color.value);
  const keyColorArr = colorArr.map((color) => color.name);

  const uniqueValueColor = valueColorArr.filter(
    (item, i, self) => self.indexOf(item) === i
  );
  const uniqueKeyColorArr = keyColorArr.filter(
    (item, i, self) => self.indexOf(item) === i
  );

  const uniqueColorArr = [];
  uniqueKeyColorArr.forEach((item, i) => {
    const newColor = {
      name: item,
      value: uniqueValueColor[i],
    };
    uniqueColorArr.push(newColor);
  });
  return uniqueColorArr;
};

function PhonePage({ searchTerm = "" }) {
  const initialFilters = {
    _order: "desc",
    _sort: "salePrices",
    _page: 1,
    _limit: 10,
  };
  const [filters, setFilters] = useState(initialFilters);
  const [phones, setPhones] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState([]);
  // Search filter
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilters({ ...initialFilters });
    } else {
      setFilters({ ...initialFilters, name_like: searchTerm });
    }
  }, [searchTerm]);

  useEffect(() => {
    try {
      (async () => {
        // Call API product phone
        setIsLoading(true);
        const res = await phoneApi.getAll(filters);
        setPhones(res.data);
        setPagination(res.pagination);
        setIsLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [filters]);

  useEffect(() => {
    try {
      (async () => {
        // Call API product phone
        setIsLoading(true);
        const res = await phoneApi.getAll({ ...initialFilters, _limit: 40 });
        setColors(getColors(res.data));
        setIsLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFilterChange = (values) => {
    setFilters(values);
  };

  const handlePaginationChange = (_page) => {
    console.log(_page);
    setFilters((state) => ({
      ...state,
      _page,
    }));
  };

  return (
    <div className="container pd-section">
      <PhoneFilter
        filters={filters}
        onChange={handleFilterChange}
        colors={colors}
      />
      <div style={{ background: "white" }}>
        {isLoading ? <Loading /> : <PhoneList phones={phones} />}
        <Pagination pagination={pagination} onChange={handlePaginationChange} />
      </div>
    </div>
  );
}

export default PhonePage;

import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import "../../app/css/base.css";

Pagination.propTypes = {
  onChange: PropTypes.func,
  pagination: PropTypes.object,
};

Pagination.defaultProps = {
  onChange: null,
  pagination: {},
};

function Pagination(props) {
  const { onChange, pagination } = props;
  const { _limit, _totalRows, _page } = pagination;
  const totalPage = Math.ceil(_totalRows / _limit) || 1;
  const numbers = Array.from(new Array(totalPage));

  const handleClick = (_page) => {
    if (!onChange) return;
    onChange(_page);
  };

  const setClassActive = (index) => {
    if (_page === index + 1) return "pagination-item active";
    return "pagination-item";
  };

  return (
    <div className="container">
      <ul className="pagination-list">
        {numbers.map((number, index) => (
          <li
            key={index}
            className={setClassActive(index)}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;

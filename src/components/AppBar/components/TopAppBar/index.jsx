import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "../../../../app/css/base.css";
import SearchTermNav from "./components/SearchTerm/index";
import "./css/styles.css";

TopAppBar.propTypes = {
  onNavChange: PropTypes.func,
  onSearch: PropTypes.func,
};

TopAppBar.defaultProps = {
  onNavChange: null,
  onSearch: null,
};

function TopAppBar(props) {
  const { onNavChange, onSearch } = props;

  return (
    <div className="container-fluid header__top ">
      <div className="container">
        <ul className="header__top-list">
          <li>
            <a href="#!">
              <Link
                to="/"
                onClick={() => {
                  if (!onNavChange) return;
                  onNavChange(-1);
                }}
              >
                <h1 className="header__top-logo">Shopping</h1>
              </Link>
            </a>
          </li>
          <li>
            <a href="#!">
              <div className="header__top-action">
                <SearchTermNav onSearch={onSearch} />
                <Link to="/cart">
                  <div className="header__top-cart">
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span>Giỏ hàng</span>
                  </div>
                </Link>
                <Link to="/history">
                  <div className="header__top-history">
                    <a href="#!">Đơn hàng</a>
                  </div>
                </Link>
                <Link to="/login">
                  <div className="header__top-history">
                    <a href="#!">Đăng nhập</a>
                  </div>
                </Link>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopAppBar;

import React from "react";
import PropTypes from "prop-types";
import "../../../../app/css/base.css";
import "./css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

TopAppBar.propTypes = {
  onChange: PropTypes.func,
};

function TopAppBar({ onChange = () => {} }) {
  return (
    <div className="container-fluid header__top ">
      <div className="container">
        <ul className="header__top-list">
          <li>
            <a href="#!">
              <Link to="/" onClick={() => onChange(null)}>
                <h1 className="header__top-logo">Shopping</h1>
              </Link>
            </a>
          </li>
          <li>
            <a href="#!">
              <div className="header__top-action">
                <div className="header__top-search">
                  <input
                    type="text"
                    name="main-search"
                    placeholder="Bạn tìm gì..."
                  />
                  <FontAwesomeIcon icon={faSearch} />
                </div>
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

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { FontAwesomeIcon } from "../../../../../node_modules/@fortawesome/react-fontawesome/index";
import FancyButton from "components/FancyButton/index";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

CartSummary.propTypes = {
  totalPrices: PropTypes.number,
  totalProducts: PropTypes.number,
};

function CartSummary(props) {
  const { totalPrices = 0, totalProducts = 0 } = props;
  const feeShip = 0;
  const [checkoutPrices, setCheckoutPrices] = useState(0);

  useEffect(() => {
    const prices = totalPrices + feeShip;
    setCheckoutPrices(prices);
  }, [totalPrices, totalProducts]);

  const handleConfirmClick = () => {};

  return (
    <div className="cart__summary">
      <div className="cart__summary-header">
        <span className="cart__summary-address-title">Địa chỉ</span>
        <p className="cart__summary-address-value">
          <i>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </i>
          <p>Hồ Chí Minh, Quận Thủ Đức, Phường Linh Trung</p>
        </p>
      </div>
      <div className="cart__summary-content">
        <h3 className="cart__summary-content-title">Thông tin đơn hàng</h3>
        <div className="cart__summary-content-estimate">
          <span className="cart__summary-subtitle">{`Tạm tính (${totalProducts} sản phẩm)`}</span>
          <span className="cart__summary-price">{`$${totalPrices}`}</span>
        </div>
        <div className="cart__summary-content-ship">
          <span className="cart__summary-subtitle">Phí giao hàng</span>
          <span className="cart__summary-price">0 USD</span>
        </div>
        <form className="cart__summary-coupon">
          <input type="text" placeholder="Mã giảm giá (chỉ áp dụng 1 lần)" />
          <button type="submit" className="btn-cart">
            Áp dụng
          </button>
        </form>
        <div className="cart__summary-content-total">
          <span className="cart__summary-total-items">Tổng cộng</span>
          <span className="cart__summary-total-price">{`$${checkoutPrices}`}</span>
        </div>
        <span className="cart__summary-vat">Đã bao gồm VAT (nếu có)</span>
      </div>
      <button className="btn-cart btn-confirm">Xác nhận giỏ hàng</button>
    </div>
  );
}

export default CartSummary;

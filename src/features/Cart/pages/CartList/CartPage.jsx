import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../../../app/css/base.css";
import "./styles.css";
import CartItem from "features/Cart/components/CardItem/index";
import { FontAwesomeIcon } from "../../../../../node_modules/@fortawesome/react-fontawesome/index";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeProductFormCart,
  setSelectedProduct,
} from "features/Cart/cartSlice";
import CartSummary from "features/Cart/components/CartSumary/index";
import { faLeaf } from "../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";

CartPage.propTypes = {};

const setInitialCheckAll = (products = []) => {
  if (products.length <= 0) return false;
  for (const product of products) {
    if (product.checked === false) return false;
  }
  return true;
};

function CartPage(props) {
  const dispatch = useDispatch();

  const stateCard = useSelector((state) => state.carts);
  const cartItems = stateCard.cartItems || [];
  const [isCheckAll, setIsCheckAll] = useState(() =>
    setInitialCheckAll(cartItems)
  );

  useEffect(() => {
    setIsCheckAll(setInitialCheckAll(stateCard.cartItems));
  }, [stateCard]);

  const totalProducts = cartItems.reduce((result, current) => {
    if (current.checked) {
      return result + Number.parseInt(current.quantity);
    }
    return result;
  }, 0);

  const totalPrices = cartItems.reduce((result, current) => {
    if (current.checked) {
      return (
        result +
        Number.parseInt(current.quantity) *
          Number.parseInt(current.product.salePrices)
      );
    }
    return result;
  }, 0);

  const handleCheckAll = () => {
    // Vi khi redux thay doi se chay lai useEffect
    cartItems.forEach((item) => {
      const action = setSelectedProduct({
        id: item.id,
        value: !isCheckAll,
      });
      dispatch(action);
    });
  };

  const handleRemoveAll = () => {
    for (const product of cartItems) {
      if (product.checked) {
        const action = removeProductFormCart(product.id);
        dispatch(action);
      }
    }
    setIsCheckAll(false);
  };

  return (
    <div className="container pd-section">
      <div className="cart">
        <div className="cart__left">
          <div className="cart__left-header">
            <div className="cart__choice-all">
              <input
                type="checkbox"
                name="check-all-item"
                checked={isCheckAll}
                className="cart__check-all"
                onChange={handleCheckAll}
              />
              <p className="cart__title-check-all">
                Chọn tất cả <span>{`(${totalProducts}) sản phẩm`}</span>
              </p>
            </div>
            <div className="cart__remove-all" onClick={handleRemoveAll}>
              <i>
                <FontAwesomeIcon icon={faTrash} />
              </i>
              <span>Xóa</span>
            </div>
          </div>
          <ul className="cart__list">
            {cartItems.map((item) => (
              <CartItem key={item.id} isCheckAll={isCheckAll} item={item} />
            ))}
          </ul>
        </div>
        <div className="cart__right">
          <CartSummary
            totalPrices={totalPrices}
            totalProducts={totalProducts}
          />
        </div>
      </div>
    </div>
  );
}

export default CartPage;

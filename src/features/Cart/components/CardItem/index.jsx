import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { FontAwesomeIcon } from "../../../../../node_modules/@fortawesome/react-fontawesome/index";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  removeProductFormCart,
  setQuantityForProduct,
  setSelectedProduct,
} from "features/Cart/cartSlice";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

CartItem.propTypes = {
  item: PropTypes.object,
};

CartItem.defaultProps = {
  item: {},
};

const imagePlacehoder =
  "https://lh3.googleusercontent.com/proxy/uHcLls2heDk3QVrOWS2zXNNBfRjv3JY8x1TTmK6wI21echMtJTb2rN0Mf8eAuYfxfG7CvUYFc0xVddumZswHZoj-gewsmtjP7MAid4EWAuZBKrvM75wK7Z2gCWxM";

function CartItem(props) {
  const { item } = props;
  const { id, product, quantity } = item;

  const dispatch = useDispatch();
  const history = useHistory();
  const isChecked = useSelector((state) => {
    const cartItems = state.carts.cartItems;
    const index = cartItems.findIndex((item) => item.id === id);
    if (index >= 0) return cartItems[index].checked;
    return false;
  });

  const [itemQuantity, setItemQuantity] = useState(quantity);

  useEffect(() => {
    handleBlurQuantityField();
  }, [itemQuantity]);

  const handleCheckChange = () => {
    const action = setSelectedProduct({
      id,
      value: !isChecked,
    });
    dispatch(action);
  };

  const handleOnRemoveItem = (e) => {
    const action = removeProductFormCart(id);
    dispatch(action);
  };

  const handleChangeQuantityField = (e) => {
    if (e.target.value < 0 || e.target.value === itemQuantity) return;
    setItemQuantity(e.target.value);
  };

  const handleBlurQuantityField = (e) => {
    if (itemQuantity < 0) return;
    const action = setQuantityForProduct({ id, quantity: itemQuantity });
    dispatch(action);
  };

  const handleOnAddQuantity = () => {
    setItemQuantity((state) => state + 1);
  };

  const handleOnMinusQuantity = () => {
    if (itemQuantity <= 0) return;
    setItemQuantity((state) => state - 1);
  };

  const handleImgClick = () => {
    history.push(`/products/${id}`);
  };

  return (
    <li className="cart__item">
      <input
        onChange={handleCheckChange}
        checked={isChecked}
        type="checkbox"
        name=""
        className="cart__card-check"
      />
      <div className="cart__card-body">
        <div className="cart__card-info">
          <div className="cart__card-img" onClick={handleImgClick}>
            <img
              src={product?.imageUrl[0] || imagePlacehoder}
              alt={product.name}
            />
          </div>
          <div className="cart__card-content">
            <h4 className="cart__card-title">{product.name}</h4>
            <p className="cart__card-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
              adipisci atque voluptatibus eaque eveniet aut optio totam sapiente
              pariatur alias!
            </p>
            {product.isPromotion ? (
              <span className="cart__card-promotion">Khuyến mãi</span>
            ) : null}
          </div>
        </div>

        <div className="cart__card-action">
          <div className="cart__card-action-left">
            <h4 className="cart__card-price">{product.salePrices} USD</h4>
            <div className="cart__card-left-action">
              <i className="cart__btn-remove" onClick={handleOnRemoveItem}>
                <FontAwesomeIcon icon={faTrash} />
              </i>
            </div>
          </div>
          <div className="cart__card-action-right">
            <button
              type="submit"
              name="minus"
              className={
                Number.parseInt(itemQuantity) === 0
                  ? "cart__btn cart__card-btn-minus disabled"
                  : "cart__btn cart__card-btn-minus "
              }
              onClick={handleOnMinusQuantity}
            >
              <i>-</i>
            </button>
            <input
              type="number"
              className="cart__quanitty-filed"
              value={itemQuantity}
              onChange={handleChangeQuantityField}
              onBlur={handleBlurQuantityField}
            />
            <button
              type="submit"
              name="add"
              className="cart__btn cart__card-btn-add"
              onClick={handleOnAddQuantity}
            >
              <i>+</i>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;

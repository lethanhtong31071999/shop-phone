import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import FancyButton from "components/FancyButton/index";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { addToCart } from "features/Cart/cartSlice";
import { useDispatch } from "react-redux";

PhoneCard.propTypes = {
  phone: PropTypes.object,
  onClick: PropTypes.func,
};

const placeholderImgUrl =
  "https://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/phone_transparent.png";

function PhoneCard({ phone = {}, onClick = null }) {
  const isPromotion = phone.isPromotion || false;
  const isFreeShip = phone.isFreeShip || false;
  const dispatch = useDispatch();

  const handleOnClickCard = (e) => {
    if (!onClick) return;
    onClick(phone);
  };

  const handleClickBtn = (e) => {
    //   Add phone to cart and redux
    const product = {
      id: phone.id,
      product: phone,
      quantity: 1,
    };
    const action = addToCart(product);
    dispatch(action);
  };

  return (
    <li className={"phone-card"}>
      {isFreeShip ? (
        <span className="phone-card__freeship">Free Ship</span>
      ) : null}
      {isPromotion ? (
        <span className="phone-card__promotion-tag">
          <strong>Giảm</strong>
          <span>{phone.promotionPercents}%</span>
        </span>
      ) : null}
      <div className="phone-card__img" onClick={handleOnClickCard}>
        <img
          src={
            phone.imageUrl.length > 0 ? phone.imageUrl[0] : placeholderImgUrl
          }
          alt={phone.name}
        />
      </div>
      <div className="phone-card__content">
        <p className="phone-card__title">{phone.name}</p>
        <p className="phone-card__menmory">
          Bộ nhớ: <span>{phone.ram || "--"}</span>/
          <span>{phone.rom || "--"}</span>
        </p>
        <div className="phone-card__color">
          Màu sắc:{" "}
          <span style={{ background: phone.colors.value || "white" }}></span>
        </div>
        {isPromotion ? (
          <div className="phone-card__promotion">
            <span className="phone-card__promotionPice">
              {phone.originalPrices}
            </span>
            <span className="phone-card__promotionPercent">
              {` -${phone.promotionPercents}%`}
            </span>
          </div>
        ) : null}
        <h4 className="phone-card__price">{phone.salePrices} USD</h4>
        <div style={{ flexShrink: 0, marginTop: "auto" }}>
          <FancyButton
            title="Thêm sản phẩm"
            onClick={(e) => handleClickBtn(e)}
          />
        </div>
      </div>
    </li>
  );
}

export default PhoneCard;

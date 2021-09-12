import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { FontAwesomeIcon } from "../../../../../../node_modules/@fortawesome/react-fontawesome/index";
import {
  faChevronLeft,
  faChevronRight,
} from "../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";

RelevantProduct.propTypes = {
  otherProducts: PropTypes.array,
};

function RelevantProduct({ otherProducts = [], onClick = () => {} }) {
  const [index, setIndex] = useState(0);
  const arrLength = otherProducts.length;

  const handleLeftButton = () => {
    const newIndex = index - 1;
    if (index <= 0) {
      setIndex(0);
      return;
    }
    setIndex(newIndex);
  };

  const handleRightButton = () => {
    const newIndex = index + 1;
    if (index >= arrLength - 3) {
      setIndex(arrLength - 3);
      return;
    }
    setIndex(newIndex);
  };

  return (
    <div className="relevant__wrapper">
      <div className="relevant__header">
        <h4>Một số sản phẩm tương tự</h4>
        <div className="relevant__action">
          <i
            className={index === 0 ? "disabled" : ""}
            onClick={() => handleLeftButton()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </i>
          <i
            className={index === arrLength - 3 ? "disabled" : ""}
            onClick={() => handleRightButton()}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </i>
        </div>
      </div>
      <div className="relevant__list--wrap">
        <ul className="relevant__list" style={{ "--index": index }}>
          {otherProducts.map((product, i) => (
            <li className="relevant__item" key={product.id}>
              <img src={product.imageUrl[0]} alt={product.name} />
              <div onClick={() => onClick(product?.id)}>
                <span>Chi tiết</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RelevantProduct;

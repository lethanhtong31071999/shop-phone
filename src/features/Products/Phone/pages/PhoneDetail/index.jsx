import React from "react";
import PropTypes from "prop-types";
import { useHistory, useRouteMatch } from "react-router";
import { useEffect } from "react";
import productApi from "api/productApi";
import { useState } from "react";
import "./styles.css";
import "../../../../../app/css/base.css";
import RelevantProduct from "../../components/RelevantProduct/index";

PhoneDetail.propTypes = {};

function PhoneDetail(props) {
  const match = useRouteMatch();
  const history = useHistory();
  const id = match.params?.id || "";
  const [product, setProduct] = useState({});
  const [mainImg, setMainImg] = useState("");
  const [subImgs, setSubImgs] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const product = await productApi.get(id);
        if (!product) return;
        setProduct(product);
        setMainImg(product.imageUrl[0] || "");
        setSubImgs(product.imageUrl || []);
      })();
    } catch (error) {
      console.log("failed to fetch data");
    }
  }, [history.location]);

  // get other products
  useEffect(() => {
    try {
      (async () => {
        // get other products
        const params = {
          categoriesId: product?.categoriesId,
          osTypes: product?.osTypes || "",
          salePrices_gte: (product?.salePrices || 0) - 1000,
          salePrices_lte: (product?.salePrices || 0) + 1000,
        };
        const products = await productApi.getAll(params);
        product = product.filters;
        setOtherProducts(products);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [product, history.location]);

  const handleOnImgClick = (imgUrl) => {
    if (!imgUrl) return;
    setMainImg(imgUrl);
  };

  const handleOnOtherProductClick = (productId) => {
    history.push(`/products/${productId}`);
  };

  return (
    <div className="container">
      <div class="detail__wrapper">
        <div className="detail__left">
          <div className="detail__left-wrapper">
            <div className="detail__main-img">
              <img src={mainImg} alt={product.name || "product"} />
            </div>
            <ul className="detail__sub-imgs">
              {subImgs.map((img, i) => (
                <li
                  className={
                    img === mainImg
                      ? "detail__sub-img active"
                      : "detail__sub-img"
                  }
                  key={i}
                  onClick={() => handleOnImgClick(img)}
                >
                  <img src={img} alt={product.name || "product"} />
                </li>
              ))}
            </ul>
          </div>
          <RelevantProduct
            otherProducts={otherProducts}
            onClick={handleOnOtherProductClick}
          />
        </div>
        <div className="detail__right">
          <div className="detail__right-wrapper"></div>
        </div>
      </div>
    </div>
  );
}

export default PhoneDetail;

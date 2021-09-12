import React from "react";
import PropTypes from "prop-types";
import { useHistory, useRouteMatch } from "react-router";
import { useEffect } from "react";
import productApi from "api/productApi";
import { useState } from "react";
import "./styles.css";
import "../../../../../app/css/base.css";
import RelevantProduct from "../../components/RelevantProduct/index";
import Loading from "components/Loading/index";
import { addToCart } from "features/Cart/cartSlice";
import { useDispatch } from "react-redux";

PhoneDetail.propTypes = {};
const placeholderImgUrl =
  "https://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/phone_transparent.png";

function PhoneDetail(props) {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const id = match.params?.id || "";
  const [product, setProduct] = useState({});
  const [mainImg, setMainImg] = useState("");
  const [subImgs, setSubImgs] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);
        const product = await productApi.get(id);
        if (!product) return;
        setProduct(product);
        setMainImg(product.imageUrl[0] || placeholderImgUrl);
        setSubImgs(product.imageUrl || []);
        setIsLoading(false);
      })();
    } catch (error) {
      console.log("failed to fetch data");
    }
  }, [history.location]);

  // get other products
  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);
        // get other products
        const params = {
          categoriesId: product?.categoriesId,
          osTypes: product?.osTypes || "",
          salePrices_gte: (product?.salePrices || 0) - 1000,
          salePrices_lte: (product?.salePrices || 0) + 1000,
        };
        let products = await productApi.getAll(params);
        products = products.filter((item) => item.id !== product.id);
        setOtherProducts(products);
        setIsLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [product, history.location]);

  const handleOnImgClick = (imgUrl) => {
    if (!imgUrl) return;
    setMainImg(imgUrl || placeholderImgUrl);
  };

  const handleOnOtherProductClick = (productId) => {
    history.push(`/products/${productId}`);
  };

  const handleOnClick = () => {
    if (Object.keys(product).length <= 0) return;

    const action = addToCart({
      id: id,
      product: product,
      quantity: 1,
    });
    dispatch(action);
  };

  if (isLoading) return <Loading />;

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
          <div className="detail__right-wrapper">
            <div className="detail__right-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="detail__right-price">
                {product.isPromotion ? (
                  <div className="phone-card__promotion">
                    <span>Khuyến mãi </span>
                    <span className="phone-card__promotionPice">
                      {product.originalPrices}
                    </span>
                    <span className="phone-card__promotionPercent">
                      {` -${product.promotionPercents}%`}
                    </span>
                  </div>
                ) : null}
                <p className="phone-card__price">
                  Giá chót <strong>{product.salePrices}</strong> USD
                </p>
              </div>
              <span className="detail__right-sold">
                Đã bán: <strong>{product.soldQuantity}</strong> sản phẩm
              </span>
              <div className="detail__right-color">
                <span>
                  Màu <strong>{product?.colors?.name}</strong>
                </span>
                <span
                  className="detail__right-color-item"
                  style={{
                    display: "inline-block",
                    background: product?.colors?.value,
                    border: "1px solid #ccc",
                    width: "1rem",
                    height: "1rem",
                  }}
                ></span>
              </div>
            </div>
            <div className="detail__right-action">
              <button className="detail__btn-buy">Buy Now</button>
              <button className="detail__btn-cart" onClick={handleOnClick}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneDetail;

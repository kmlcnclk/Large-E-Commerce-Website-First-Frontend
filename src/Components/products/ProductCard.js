import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../Store/Actions/product.actions";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import LoadingScreen from "../toolbox/LoadingScreen";

function ProductCard() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer);

  useEffect(() => {
    const productCards = async () => {
      let href = window.location.href;
      let sec = href.split("/");

      await dispatch(getAllProduct(sec[sec.length - 1]));
    };
    productCards();
  }, [dispatch]);

  const mainPage = () => {
    return (
      <div className="product-card mt-1">
        {products.map((product) => (
          <div
            className="card"
            style={{ display: "inline-block", borderRadius: "1rem" }}
            key={product._id}
          >
            <img
              src={product.imageUrl[0]}
              style={{ marginTop: "20px" }}
              className="img"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
                <div className="titleName">{product.name}</div>
                <br />
                <div className="price">$ {product.price}</div>
              </h5>
              <p className="card-text">{product.content}</p>
              <Link
                to={"/productDetail/" + product.slug}
                className="btn btn-block btn-primary"
                style={{ fontSize: "0.9rem" }}
              >
                <strong>Go to Product</strong>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen loading={loading} setLoading={setLoading} />
      ) : (
        mainPage()
      )}
    </div>
  );
}

export default ProductCard;

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../Store/Actions/product.actions";
import { BarLoader } from "react-spinners";
import "./productDetail.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import alertify from "alertifyjs";
import { addLocal, deleteLocal } from "../../Store/Actions/localStorage.actions";

class ProductDetail extends Component {
  state = {
    loading: false,
    images: [],
    index: 0,
    product: {},
    like: false,
  };

  async componentDidMount() {
    await this.productState();

    this.setState({ product: this.props.productDetail });

    this.setState({ loading: true });
    const timing = setTimeout(() => {
      this.setState({ loading: false });
      const { index } = this.state;
      this.myRef.current.children[index].className = "active";
    }, 1500);

    if (window.localStorage.getItem("User")) {
      const user = JSON.parse(window.localStorage.getItem("User"))[0];

      var result = this.state.product.likes.includes(user._id);
      if (result) {
        this.setState({ like: true });
      }
    }

    return () => clearTimeout(timing);
  }

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  productState = async () => {
    let href = window.location.href;
    let sec = href.split("/");
    await this.props.actions.productDetails(sec[sec.length - 1]);
  };

  loadingPage() {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <BarLoader
          height="4px"
          width="99%"
          color={"red"}
          loading={this.state.loading}
        />
      </div>
    );
  }

  addToCart = async () => {
    await this.props.actions.addToCartAction(this.props.productDetail);

    if (this.props.carts.success) {
      await deleteLocal();
      await addLocal(this.props.carts.data);
      alertify.success(this.props.productDetail.name + " Added Your Cart");
    } else {
      alertify.error(this.props.carts.message);
    }
  };

  likeOrUndoLikeProduct = async (product) => {
    if (window.localStorage.getItem("User")) {
      const user = JSON.parse(window.localStorage.getItem("User"))[0];

      var result = product.likes.includes(user._id);
      if (result) {
        await this.props.actions.undoLikeProductAction(product);

        await this.setState({ product: this.props.undoLikeProduct.data });
        this.setState({ like: false });
        alertify.success("You undo like the " + this.state.product.name);
      } else {
        await this.props.actions.likeProductAction(product);

        await this.setState({ product: this.props.likeProduct.data });
        this.setState({ like: true });
        alertify.success("You like the " + this.state.product.name);
      }
    } else {
      alertify.error("You are not logged in");
    }
  };

  mainPage() {
    const { product } = this.state;

    if (product.name !== undefined) {
      return (
        <div className="product-detail mt-2">
          <div className="border product-row">
            <div className="colasd">
              <Zoom>
                <picture>
                  <img
                    src={product.imageUrl[this.state.index]}
                    className="img2"
                    alt="ProductImage"
                  />
                </picture>
              </Zoom>
            </div>
            <div className="colasd2">
              <h5 className="product-name">
                <strong>{product.name}</strong>
              </h5>
              <div className="product-price">
                <div className="d-inline product-price-item1">
                  <strong>
                    <strike>${product.price}</strike>
                  </strong>
                </div>
                <div className="d-inline product-price-item2">
                  <strong>${product.price}</strong>
                </div>
              </div>
              <div className="product-content">
                <strong>{product.content}</strong>
              </div>
              <div className="product-like">
                <div className="d-inline">
                  <div
                    className="d-inline product-likeCount"
                    style={{ fontSize: "1rem", color: "#616161" }}
                  >
                    <strong> Likes: {product.likeCount}</strong>
                  </div>
                  <div className="mt-3">
                    {this.state.like ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        onClick={() => this.likeOrUndoLikeProduct(product)}
                        style={{
                          color: "red",
                          fontSize: "2rem",
                          cursor: "pointer",
                        }}
                        fill="currentColor"
                        className="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        onClick={() => this.likeOrUndoLikeProduct(product)}
                        style={{
                          color: "red",
                          fontSize: "2rem",
                          cursor: "pointer",
                        }}
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="thumb" ref={this.myRef}>
                {product.imageUrl.map((img, index) => (
                  <img
                    key={index}
                    onClick={() => this.handleTab(index)}
                    src={img}
                    alt="ProductImage"
                  />
                ))}
              </div>
              <div className="add-to-cart">
                <button
                  type="button"
                  onClick={this.addToCart}
                  className="btn btn-block  btn-warning"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>{this.state.loading ? this.loadingPage() : this.mainPage()}</div>
    );
  }
}
function mapStateToProps(state) {
  return {
    productDetail: state.productDetailReducer,
    productAddToCart: state.productAddToCartReducer,
    carts: state.productAddToCartReducer,
    likeProduct: state.likeProductReducer,
    undoLikeProduct: state.undoLikeProductReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      productDetails: bindActionCreators(
        productActions.getProductDetail,
        dispatch
      ),
      addToCartAction: bindActionCreators(
        productActions.productAddToCart,
        dispatch
      ),
      likeProductAction: bindActionCreators(
        productActions.likeProduct,
        dispatch
      ),
      undoLikeProductAction: bindActionCreators(
        productActions.undoLikeProduct,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

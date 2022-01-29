import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as localStorageActions from "../../Store/Actions/localStorage.actions";
import "./Cart.css";
import * as productActions from "../../Store/Actions/product.actions";
import * as userCartActions from "../../Store/Actions/userCart.actions";
import alertify from "alertifyjs";
import { Badge } from "react-bootstrap";

class Cart extends Component {
  state = {
    cart: false,
    userCart: [],
    user: {},
  };

  async componentDidMount() {
    if (window.localStorage.getItem("User")) {
      if (
        JSON.parse(window.localStorage.getItem("User"))[0].cart.length === 0
      ) {
        this.setState({ cart: false });
      } else {
        await this.setState({ cart: true });
        await this.props.actions.getUserCartAction();
        await this.setState({
          userCart: this.props.getUserCart.data,
        });
        console.log(this.state.userCart);
        await this.setState({
          user: this.props.getUserCart.user,
        });
      }
    } else {
      this.setState({ cart: false });
    }
  }

  removeFromCart = async (product) => {
    await this.props.actions.productRemoveFromCart(product.product);

    if (this.props.newCarts.success) {
      await localStorageActions.deleteLocal();
      await localStorageActions.addLocal(this.props.newCarts.data);
      await this.props.actions.getUserCartAction();
      await this.setState({
        userCart: this.props.getUserCart.data,
      });
      await this.setState({
        user: this.props.getUserCart.user,
      });
      alertify.success(product.product.name + " Remove From Your Cart");
    } else {
      alertify.error(this.props.newCarts.message);
    }
    setTimeout(() => {
      if (!this.state.userCart[0]) {
        window.location.reload();
      }
    }, 1000);
  };

  fullRemoveFromCart = async (product) => {
    await this.props.actions.fullProductRemoveFromCart(product.product);

    if (this.props.fullCarts.success) {
      await localStorageActions.deleteLocal();
      await localStorageActions.addLocal(this.props.fullCarts.data);
      await this.props.actions.getUserCartAction();
      await this.setState({
        userCart: this.props.getUserCart.data,
      });
      await this.setState({
        user: this.props.getUserCart.user,
      });
      alertify.success(product.product.name + " Remove From Your Cart");
    } else {
      alertify.error(this.props.fullCarts.message);
    }
    setTimeout(() => {
      if (!this.state.userCart[0]) {
        window.location.reload();
      }
    }, 1000);
  };

  addToCart = async (product) => {
    await this.props.actions.addToCartAction(product.product);

    if (this.props.carts.success) {
      await localStorageActions.deleteLocal();
      await localStorageActions.addLocal(this.props.carts.data);
      await this.props.actions.getUserCartAction();
      await this.setState({
        userCart: this.props.getUserCart.data,
      });
      await this.setState({
        user: this.props.getUserCart.user,
      });
      alertify.success(product.product.name + " Added To Your Cart");
    } else {
      alertify.error(this.props.carts.message);
    }
  };

  emptyCart = () => {
    return <div>Empty Your Cart</div>;
  };

  fullCart = () => {
    const { userCart, user } = this.state;
    return (
      <div className="cart-container">
        <div className="row cart-mainDiv">
          <div className="col-9" style={{ display: "inline" }}>
            {userCart.map((product) => (
              <div className="card cart-card" key={product.product._id}>
                <div className="row no-gutters">
                  <div
                    className="col-md-4"
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={product.product.imageUrl[0]}
                      className="cart-image"
                      alt="ProductImage"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">
                        <strong>{product.product.name}</strong>
                      </h4>
                      <h5
                        className="card-title"
                        style={{
                          fontFamily: "Arial, Helvetica, sans-serif",
                          marginTop: "1rem",
                        }}
                      >
                        <strong>$</strong> {product.product.price}
                      </h5>
                      <p
                        className="card-text"
                        style={{
                          marginTop: "1rem",
                        }}
                      >
                        {product.product.content}
                      </p>

                      <div className="cart-addOrRemoveQuantity">
                        <div className="d-inline-block m-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            onClick={() => this.addToCart(product)}
                            height="23"
                            fill="currentColor"
                            style={{ cursor: "pointer" }}
                            className="bi bi-plus-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                          <div className="m-1 d-inline-block">
                            <Badge className="cart-cartQuantityBadge">
                              {product.quantity}
                            </Badge>
                          </div>
                          <svg
                            onClick={() => this.removeFromCart(product)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="23"
                            style={{ cursor: "pointer" }}
                            fill="currentColor"
                            className="bi bi-dash-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        </div>
                        <div className="d-inline-block m-1 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            onClick={() => this.fullRemoveFromCart(product)}
                            fill="currentColor"
                            className="bi bi-trash"
                            style={{ cursor: "pointer" }}
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-product-cart">
            <div className="card ">
              <div className="cart-cartCount">
                <div className="cart-cartCount-text">
                  Total number of products:{" "}
                </div>
                <Badge className="cart-cartCount-number">
                  {user.cartCount}
                </Badge>
              </div>
              <div className="cart-cartPrice">
                <div className="cart-cartPrice-text">Total basket price: </div>
                <Badge className="cart-cartPrice-number">
                  <strong>$</strong> {user.cartTotalPrice}
                </Badge>
              </div>
              <button className="btn btn-danger block m-1">
                Complete shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { cart } = this.state;
    return <div>{cart ? this.fullCart() : this.emptyCart()}</div>;
  }
}
function mapStateToProps(state) {
  return {
    login: state.loginReducer,
    localStorage: state.localStorageReducer,
    carts: state.productAddToCartReducer,
    newCarts: state.productRemoveFromCartReducer,
    fullCarts: state.fullProductRemoveFromCartReducer,
    getUserCart: state.getUserCartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      localStorageAction: bindActionCreators(
        localStorageActions.localStorage,
        dispatch
      ),
      productRemoveFromCart: bindActionCreators(
        productActions.productRemoveFromCart,
        dispatch
      ),
      fullProductRemoveFromCart: bindActionCreators(
        productActions.fullProductRemoveFromCart,
        dispatch
      ),
      addToCartAction: bindActionCreators(
        productActions.productAddToCart,
        dispatch
      ),
      getUserCartAction: bindActionCreators(
        userCartActions.getUserCart,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

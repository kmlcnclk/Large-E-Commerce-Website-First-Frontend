import React, { Component } from "react";
import { bindActionCreators } from "redux";
import "./Profile.css";
// import "../../products/ProductCard.css"
import * as profileActions from "../../../Store/Actions/profile.actions";
import * as profileImageStaticActions from "../../../Store/Actions/profileImageStatic.actions";
import { connect } from "react-redux";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import * as profileImageUploadctions from "../../../Store/Actions/profileImageUpload.actions";
import * as productDeleteActions from "../../../Store/Actions/productDelete.actions";
import { RiShoppingCartLine } from "react-icons/ri";
import ProfileImage from "./ProfileImage";
import {
  addLocal,
  deleteLocal,
} from "../../../Store/Actions/localStorage.actions";

class Profile extends Component {
  state = {
    user: {},
    profileImageStatic: "",
    userCartState1: false,
    userCartState2: true,
    userProductState1: false,
    userProductState2: true,
    deleted: false,
  };

  async componentDidMount() {
    await this.props.actions.profileAction();

    if (this.props.profile.success) {
      await this.props.actions.profileImageStaticAction(
        this.props.profile.data.profile_image
      );
      this.setState({ profileImageStatic: this.props.profileImageStatic });

      this.setState({ user: this.props.profile.data });
      if (this.props.profile.data.cart[0]) {
        this.setState({ userCartState2: false });
      }
      if (this.props.profile.data.products[0]) {
        this.setState({ userProductState2: false });
      }
    } else {
      alertify.error(this.props.profile.message);
      this.setState({ userCartState2: true });
      this.setState({ userProductState2: true });
    }
  }
  profileCartVisible = (e) => {
    this.setState({ userCartState1: !this.state.userCartState1 });
  };

  profileProductVisible = () => {
    this.setState({ userProductState1: !this.state.userProductState1 });
  };

  deleteProductBtn = async (id) => {
    await this.props.actions.productDeleteAction(id);

    if (this.props.productDelete.success) {
      deleteLocal();
      alertify.success(this.props.productDelete.message);
      this.setState({ deleted: true });
      addLocal(this.props.productDelete.user);
    } else {
      alertify.error(this.props.productDelete.message);
      this.setState({ deleted: false });
    }

    setTimeout(() => {
      if (this.state.deleted) {
        window.location.reload();
      }
    }, 1000);
  };

  render() {
    const {
      user,
      profileImageStatic,
      userCartState1,
      userCartState2,
      userProductState1,
      userProductState2,
    } = this.state;
    return (
      <div>
        <div className="profile-MainDiv border mt-2">
          <div className="profile-childDiv1">
            <ProfileImage profileImageStatic={profileImageStatic} />
            <div className="profile-childDiv2">
              <div className="profile-nameAndBtn">
                <div className="profile-nameDiv">
                  <h4 className="profile-nameH">
                    <strong>{user.name}</strong>
                  </h4>
                </div>

                <Link
                  to="/updateProfile"
                  className="btn btn-danger btn-sm profile-editProfileBtn"
                >
                  Edit profile
                </Link>
              </div>
              <div className="profile-cartCount">
                <div className="profile-cartMainDiv">
                  <div className="d-inline-block">
                    <Link to="/cart" style={{ color: "black" }}>
                      <RiShoppingCartLine
                        style={{
                          padding: "1px",
                          cursor: "pointer",
                          marginBottom: "0.5rem",
                        }}
                        size={23}
                      />
                    </Link>
                  </div>
                  <div
                    className="d-inline-block"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    <strong> {user.cartCount}</strong>
                  </div>

                  <div className="profile-cartMainDiv d-inline-block ml-5">
                    <div className="d-inline-block">
                      <strong>Your products:</strong>
                    </div>
                    <div
                      className="d-inline-block"
                      style={{ marginLeft: "0.5rem" }}
                    >
                      <strong> {user.productCount}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={this.profileCartVisible}
          style={
            userCartState1
              ? {
                  backgroundColor: "#bcac9a",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "80%",
                  padding: "1rem",
                  marginBottom: "8px",

                  color: "#575757",
                }
              : {
                  fontSize: "1.5rem",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "80%",
                  padding: "1rem",
                  marginBottom: "8px",
                }
          }
          id="profileCartVisible"
          className="profile-MainDiv border mt-2 d-block justify-content-center"
        >
          <strong>Your Cart</strong>
        </div>
        {userCartState1 ? (
          <div>
            {userCartState2 ? (
              <div
                style={{
                  backgroundColor: "#bcac9a",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "80%",
                  padding: "1rem",
                  color: "#575757",
                  marginBottom: "8px",
                }}
                id="profileCartVisible"
                className="profile-MainDiv border mt-2 d-block justify-content-center"
              >
                <strong>Empty Your Cart</strong>
              </div>
            ) : (
              <div
                className="profile-MainDiv border mt-2 d-flex justify-content-center"
                style={{ width: "80%", backgroundColor: "#bcac9a" }}
              >
                <div
                  style={{
                    margin: "2rem",
                    marginLeft: "2.4rem",
                    marginRight: "2.4rem",
                  }}
                >
                  {user.cart.map((cartItem) => (
                    <div
                      key={cartItem.product._id}
                      className="card"
                      style={{
                        display: "inline-block",
                        borderRadius: "1rem",
                      }}
                    >
                      <img
                        src={cartItem.product.imageUrl[0]}
                        className="img"
                        style={{ marginTop: "20px" }}
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          <div className="titleName">
                            {cartItem.product.name}
                          </div>
                          <br />
                          <div className="price">
                            $ {cartItem.product.price}
                          </div>
                        </h5>
                        <p className="card-text">{cartItem.product.content}</p>
                        <Link
                          to={"/productDetail/" + cartItem.product.slug}
                          className="btn btn-block btn-primary"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <strong>Go to Product</strong>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
        <div
          onClick={this.profileProductVisible}
          style={
            userProductState1
              ? {
                  backgroundColor: "#bcac9a",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "80%",
                  padding: "1rem",
                  color: "#575757",
                  marginBottom: "8px",
                }
              : {
                  fontSize: "1.5rem",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "80%",
                  padding: "1rem",
                  marginBottom: "8px",
                }
          }
          className="profile-MainDiv border mt-2 d-block justify-content-center"
        >
          <strong>Your Products</strong>
        </div>
        {userProductState1 ? (
          <div>
            {userProductState2 ? (
              <div
                onClick={this.profileProductVisible}
                style={{
                  fontSize: "1.5rem",
                  color: "#575757",
                  textAlign: "center",
                  backgroundColor: "#bcac9a",
                  cursor: "pointer",
                  width: "80%",
                  padding: "1rem",
                  marginBottom: "8px",
                }}
                className="profile-MainDiv border mt-2 d-block justify-content-center"
              >
                <strong>You Have No Products</strong>
              </div>
            ) : (
              <div
                className="profile-MainDiv border mt-2 d-flex justify-content-center"
                style={{
                  width: "80%",
                  marginBottom: "1rem",
                  backgroundColor: "#bcac9a",
                }}
              >
                <div
                  style={{
                    margin: "2rem",
                    marginLeft: "2.4rem",
                    marginRight: "2.4rem",
                  }}
                >
                  {user.products.map((product) => (
                    <div
                      key={product._id}
                      className="card"
                      style={{
                        display: "inline-block",
                        borderRadius: "1rem",
                      }}
                    >
                      <img
                        src={product.imageUrl[0]}
                        className="img"
                        style={{ marginTop: "20px" }}
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
                          to={"/updateProduct/" + product.slug}
                          className="btn btn-block btn-primary"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <strong>Go to Product Update</strong>
                        </Link>
                        <button
                          className="btn btn-block btn-danger"
                          style={{ fontSize: "0.9rem", marginTop: "0.7rem" }}
                          onClick={() => this.deleteProductBtn(product._id)}
                        >
                          <strong>Delete Product</strong>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profileReducer,
    profileImageStatic: state.profileImageStaticReducer,
    profileImageLocal: state.profileImageLocalReducer,
    profileImageUpload: state.profileImageUploadReducer,
    productDelete: state.productDeleteReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      profileAction: bindActionCreators(profileActions.profile, dispatch),
      profileImageStaticAction: bindActionCreators(
        profileImageStaticActions.profileImageStatic,
        dispatch
      ),
      profileImageUploadAction: bindActionCreators(
        profileImageUploadctions.profileImageUpload,
        dispatch
      ),
      productDeleteAction: bindActionCreators(
        productDeleteActions.productDelete,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

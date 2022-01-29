import React, { Component } from "react";
import "./Navi.css";
import posed from "react-pose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../Store/Actions/product.actions";
import { Link } from "react-router-dom";
import * as localStorageActions from "../../Store/Actions/localStorage.actions";
import * as logoutActions from "../../Store/Actions/logout.actions";
import alertify from "alertifyjs";
import * as loginActions from "../../Store/Actions/login.actions";
import jwt from "jsonwebtoken";
import { RiShoppingCartLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const Animation = posed.div({
  visible: {
    opacity: 1,
    applyAtStart: {
      display: "block",
    },
  },
  hidden: {
    opacity: 0,
    applyAtEnd: {
      display: "none",
    },
  },
});

class Navi extends Component {
  state = {
    isVisible: false,
    asVisible: true,
    res: "",
    message: "",
    errorMessage: "",
    access_token: "",
  };

  clickSearch = (e) => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  searchProduct = (e) => {
    let searchInput = document.getElementById("search");

    this.props.actions.getProductSearch(searchInput.value);
  };
  // routeSearch = () => {
  //   let search = document.getElementById("search");
  //   let url = "/productsearch=" + search.value;
  //   return url;
  // };

  changeInput = (e) => {
    this.setState({ res: e.target.value });
  };

  async componentDidMount() {
    if (window.localStorage.getItem("User")) {
      this.props.actions.logStateAction(false);
    }

    if (window.localStorage.getItem("access_token")) {
      const access_token = await JSON.parse(
        window.localStorage.getItem("access_token")
      )[0];

      jwt.verify(access_token, "coffeescript", (err, decoded) => {
        if (err) {
          this.signOut();
        }
      });
    }
  }

  signOut = async () => {
    await this.props.actions.logoutAction();

    if (this.props.logout === "Logout Successful") {
      this.setState({ message: this.props.logout });
      alertify.success(this.state.message);
      this.props.actions.logStateAction(true);
    } else {
      this.setState({ errorMessage: this.props.logout });
      alertify.error(this.state.errorMessage);
      this.props.actions.logStateAction(true);
    }
    localStorageActions.deleteLocal();
    localStorageActions.deleteAccessTokenLocal();
    setTimeout(() => {
      this.props.history.push("/");
    }, 500);
  };

  render() {
    return (
      <header
        className="blog-header py-3 border"
        style={{ borderRadius: "0.5rem" }}
      >
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="pl-4 col-5 pt-1">
            {this.props.logState ? (
              <div>
                <Link to="/auth/register">
                  <button
                    type="button"
                    className="btn btn btn-danger btn-sm m-1"
                  >
                    Register
                  </button>
                </Link>
                <Link to="/auth/login">
                  <button
                    type="button"
                    className="btn btn btn-danger btn-sm m-1"
                  >
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={this.signOut}
              >
                Logout
              </button>
            )}
          </div>

          <div className="col-2 text-center">
            <strong className="blog-header-logo">
              <Link to="/" className="text-decoration-none text-dark">
                Large
              </Link>
            </strong>
          </div>
          <div className="col-5 pr-4 d-flex justify-content-end align-items-center">
            <Animation
              className="mr-4"
              pose={this.state.isVisible ? "visible" : "hidden"}
            >
              <div className="input-group m-2 bold">
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="Search"
                  onChange={(e) => this.changeInput(e)}
                />
                <div className="input-group-append">
                  <Link
                    className="btn btn-danger"
                    type="button"
                    to={"/product?search=" + this.state.res}
                    onClick={this.searchProduct}
                  >
                    Search
                  </Link>
                </div>
              </div>
            </Animation>
            <div className="border mr-1" style={{ borderRadius: "1rem" }}>
              <div
                onClick={this.clickSearch}
                className="m-2 bold d-inline-block"
              >
                <AiOutlineSearch
                  size={23}
                  style={{ padding: "1px", cursor: "pointer" }}
                />
              </div>
              <div className="m-2 bold d-inline-block">
                <Link to="/cart" style={{ color: "black" }}>
                  <RiShoppingCartLine
                    style={{ padding: "1px", cursor: "pointer" }}
                    size={23}
                  />
                </Link>
              </div>
              {this.props.logState ? null : (
                <div className="m-2 bold d-inline-block">
                  <div className="dropdown">
                    <div
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <BsPerson
                        size={23}
                        style={{ padding: "1px", cursor: "pointer" }}
                      />
                    </div>

                    <div
                      className="dropdown-menu bg-dark dropdown-menu-right"
                      style={{
                        margin: "0.7rem",
                        marginRight: "0rem",
                        padding: "0",
                      }}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link
                        className="dropdown-item bg-dark text-light mt-3"
                        to="/profile"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Profile
                      </Link>
                      <hr className="bg-dark-gray"></hr>
                      <Link
                        className="dropdown-item bg-dark text-light"
                        to="/updateProfile"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Profile Edit
                      </Link>
                      <hr className="bg-dark-gray"></hr>
                      <Link
                        className="dropdown-item bg-dark text-light"
                        to="/productAdd"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Product Add
                      </Link>
                      <hr className="bg-dark-gray"></hr>
                      <Link
                        className="dropdown-item bg-dark text-light mb-3"
                        to="/deleteProduct"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Delete Product
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
function mapStateToProps(state) {
  return {
    searchProduct: state.searchProductReducer,
    products: state.productReducer,
    login: state.loginReducer,
    logout: state.logoutReducer,
    notLogout: state.notLogoutReducer,
    logState: state.logStateReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProductSearch: bindActionCreators(
        productActions.getAllProductSearch,
        dispatch
      ),
      localStorageAction: bindActionCreators(
        localStorageActions.localStorage,
        dispatch
      ),
      logoutAction: bindActionCreators(logoutActions.logout, dispatch),
      logStateAction: bindActionCreators(loginActions.logState, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);

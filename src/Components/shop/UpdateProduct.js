import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addLocal,
  deleteLocal,
} from "../../Store/Actions/localStorage.actions";
import * as productUpdateActions from "../../Store/Actions/productUpdate.actions";
import alertify from "alertifyjs";
import * as categoryActions from "../../Store/Actions/category.actions";
import * as productActions from "../../Store/Actions/product.actions";

class UpdateProduct extends Component {
  state = {
    user: {},
    name: "",
    content: "",
    price: "",
    product_image: [],
    category: "",
    errorMessage: "",
    route: false,
    product: {},
  };

  async componentDidMount() {
    if (window.localStorage.getItem("User")) {
      const location = window.location.href;
      const href = location.split("/");

      await this.props.actions.productDetails(href[href.length - 1]);

      this.setState({ product: this.props.productDetail });
      this.setState({ name: this.state.product.name });
      this.setState({ content: this.state.product.content });
      this.setState({ price: this.state.product.price });
      this.setState({ category: this.state.product.category });

      this.props.actions.getAllCategoryAction();
    } else {
      alertify.error("You cannot enter here without logging in");
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    }
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileChangeInput = (e) => {
    const files = e.target.files;
    this.setState({ product_image: files });
  };

  addProductFormSubmit = async (e) => {
    e.preventDefault();

    var category;

    await this.props.getCategory.forEach((c) => {
      if (c.name === this.state.category) {
        category = c._id;
      }
    });

    await this.props.actions.productUpdateAction(
      this.state.product._id,
      this.state.name,
      this.state.content,
      this.state.price,
      category
    );

    if (this.props.productUpdate.success) {
      await this.props.actions.productUpdateImageAction(
        this.state.product_image,
        this.state.product._id
      );

      if (this.props.productUpdateImage.success) {
        deleteLocal();
        this.setState({ user: this.props.productUpdateImage.user });
        alertify.success(this.props.productUpdate.data.name + " Updated");
        addLocal(this.state.user);
        this.setState({ route: true });
      } else {
        this.setState({ errorMessage: this.props.productUpdateImage.message });
        alertify.error(this.state.errorMessage);
        this.setState({ route: false });
      }
    } else {
      this.setState({ errorMessage: this.props.productUpdate.message });
      alertify.error(this.state.errorMessage);
      this.setState({ route: false });
    }

    setTimeout(() => {
      if (this.state.route) {
        this.props.history.push("/");
      }
    }, 1000);
  };

  render() {
    return (
      <div className="updateProfile">
        <div className="updateProfile-mainDiv">
          <form
            className="form-updateProfile"
            onSubmit={this.addProductFormSubmit}
          >
            <h1 className="h3 mb-3 text-center font-weight-normal">
              Product Update
            </h1>

            <label htmlFor="inputName" className="sr-only">
              Product name
            </label>
            <input
              type="text"
              id="updateProfileName"
              className="form-control"
              placeholder="Product name"
              required
              value={this.state.name}
              autoFocus
              onChange={this.changeInput}
              name="name"
            />

            <label htmlFor="inputEmail" className="sr-only">
              Product content
            </label>
            <input
              type="text"
              id="updateProfileEmail"
              className="form-control"
              placeholder="Product content"
              required
              value={this.state.content}
              onChange={this.changeInput}
              name="content"
            />
            <label htmlFor="inputPassword" className="sr-only">
              Product price
            </label>
            <input
              type="text"
              id="updateProfilePassword"
              className="form-control"
              placeholder="Price"
              name="price"
              value={this.state.price}
              required
              onChange={this.changeInput}
            />
            <label htmlFor="inputPassword" className="sr-only">
              Product category
            </label>

            <select
              className="form-control"
              id="exampleFormControlSelect1"
              placeholder="Category"
              required
              name="category"
              onChange={this.changeInput}
              defaultValue="Select Category"
            >
              <option disabled>Select Category</option>
              {this.props.getCategory.map((category) => (
                <option name={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div id="updateProfileImageForm">
              <label
                htmlFor="inputPassword"
                className="ml-1"
                style={{ fontSize: "0.95rem" }}
              >
                <strong> Product Image :</strong>
              </label>
              <input
                onChange={this.fileChangeInput}
                className="form-control"
                type="file"
                id="updateProfileImage"
                name="product_image"
                multiple
              />
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Product Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productUpdate: state.productUpdateReducer,
    productUpdateImage: state.productUpdateImageReducer,
    getCategory: state.categoryReducer,
    productDetail: state.productDetailReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      productUpdateAction: bindActionCreators(
        productUpdateActions.productUpdate,
        dispatch
      ),
      productUpdateImageAction: bindActionCreators(
        productUpdateActions.productUpdateImage,
        dispatch
      ),
      getAllCategoryAction: bindActionCreators(
        categoryActions.getAllCategory,
        dispatch
      ),
      productDetails: bindActionCreators(
        productActions.getProductDetail,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);

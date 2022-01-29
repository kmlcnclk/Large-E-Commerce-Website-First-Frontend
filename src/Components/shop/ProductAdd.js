import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productAddActions from "../../Store/Actions/productAdd.actions";
import * as categoryActions from "../../Store/Actions/category.actions";
import alertify from "alertifyjs";
import {
  addLocal,
  deleteLocal,
} from "../../Store/Actions/localStorage.actions";

class ProductAdd extends Component {
  state = {
    user: {},
    name: "",
    content: "",
    price: "",
    product_image: [],
    category: "",
    errorMessage: "",
    route: false,
  };

  async componentDidMount() {
    if (window.localStorage.getItem("User")) {
      this.props.actions.getAllCategoryAction();
    } else {
      alertify.error("You cannot enter here without logging in");
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    }
  }

  changeInput = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileChangeInput = async (e) => {
    const files = e.target.files;
    await this.setState({ product_image: files });
  };

  addProductFormSubmit = async (e) => {
    e.preventDefault();

    var category;

    await this.props.getCategory.forEach((c) => {
      if (c.name === this.state.category) {
        category = c._id;
      }
    });

    await this.props.actions.productAddAction(
      this.state.name,
      this.state.content,
      this.state.price,
      category
    );

    if (this.props.productAdd.success) {
      await this.props.actions.productAddImageAction(
        this.state.product_image,
        this.props.productAdd.data._id
      );

      if (this.props.productAddImage.success) {
        await deleteLocal();
        this.setState({ user: this.props.productAddImage.user });
        alertify.success(this.props.productAdd.data.name + " Added");
        addLocal(this.state.user);
        this.setState({ route: true });
      } else {
        this.setState({ errorMessage: this.props.productAddImage.message });
        alertify.error(this.state.errorMessage);
        this.setState({ route: false });
      }
    } else {
      this.setState({ errorMessage: this.props.productAdd.message });
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
              Product Add
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
                required
              />
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Product Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productAdd: state.productAddReducer,
    productAddImage: state.productAddImageReducer,
    getCategory: state.categoryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      productAddAction: bindActionCreators(
        productAddActions.productAdd,
        dispatch
      ),
      productAddImageAction: bindActionCreators(
        productAddActions.productAddImage,
        dispatch
      ),
      getAllCategoryAction: bindActionCreators(
        categoryActions.getAllCategory,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);

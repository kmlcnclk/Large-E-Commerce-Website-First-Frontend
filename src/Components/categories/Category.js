import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../Store/Actions/category.actions";
import * as productActions from "../../Store/Actions/product.actions";
import "./Category.css";

class Category extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  currentCategory(category) {
    this.props.actions.getProducts(category.slug);
    this.props.actions.currentCategory(category);
  }

  render() {
    const { categories } = this.props;
    return (
      <div className="border category" style={{borderRadius:"0.5rem"}}>
        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content-between">
            {categories.map((category) => (
              <Link
                to={"/category/" + category.slug}
                className="text-decoration-none text-dark"
                key={category._id}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => this.currentCategory(category)}
                  className="p-2 text-muted"
                >
                  {category.name}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categoryReducer,
    products: state.productReducer,
    currentCategory: state.currentCategoryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getAllCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getAllProduct, dispatch),
      currentCategory: bindActionCreators(
        categoryActions.currentCategory,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

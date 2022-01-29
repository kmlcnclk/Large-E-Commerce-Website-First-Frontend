import "./ProductCard.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productAddActions from "../../Store/Actions/productAdd.actions";
import * as productActions from "../../Store/Actions/product.actions";
import { Link } from "react-router-dom";
import LoadingScreen from "../toolbox/LoadingScreen";

class ProductCard extends Component {
  state = {
    loading: true,
    productImage: "",
  };

  async componentDidMount() {
    await this.productCards();

    // this.props.getAllProduct.forEach(async (el) => {
    //   await this.props.actions.productAddImageStatic(el.imageUrl[0]);

    //   this.setState({ productImage: this.props.productAddImageStatic });
    // });
    console.log(this.props.getAllProduct);
  }

  productCards = async () => {
    let href = window.location.href;
    let sec = href.split("/");

    await this.props.actions.getAllProductAction(sec[sec.length - 1]);
  };

  getProductImageStatic = async (image) => {
    await this.props.actions.productAddImageStatic(image);

    this.setState({ productImage: this.props.productAddImageStatic });
  };

  mainPage = () => {
    return (
      <div className="product-card mt-1">
        {this.props.getAllProduct.map((product) => (
          <div
            className="card"
            style={{ display: "inline-block" }}
            key={product._id}
          >
            <img src={product.imageUrl[0]} className="img" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                <div className="titleName">{product.name}</div>
                <br />
                <div className="price">$ {product.price}</div>
              </h5>
              <p className="card-text">{product.content}</p>
              <Link
                to={"/productDetail/" + product.slug}
                className="btn btn-primary"
              >
                Go to Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <React.Suspense fallback={<LoadingScreen />}>
          {this.mainPage()}
        </React.Suspense>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    productAddImageStatic: state.productAddImageStaticReducer,
    getAllProduct: state.productReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      productAddImageStatic: bindActionCreators(
        productAddActions.productAddImageStatic,
        dispatch
      ),
      getAllProductAction: bindActionCreators(
        productActions.getAllProduct,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);





// import React from "react";
// import { BarLoader } from "react-spinners";

// function LoadingScreen() {
//   return (
//     <div className="d-flex justify-content-center align-items-center">
//       <BarLoader height="4px" width="99%" color={"red"} loading={true} />
//     </div>
//   );
// }

// export default LoadingScreen;



































// import { useSelector, useDispatch } from "react-redux";
// import "./ProductCard.css";
// import * as productActions from "../../Store/Actions/product.actions";
// import { Link } from "react-router-dom";
// import LoadingScreen from "../toolbox/LoadingScreen";

// import React, { Component } from "react";
// import { bindActionCreators } from "redux";

// export default class AllProductCard extends Component {
//   state = {
//     loading: true,
//   };

//   componentDidMount() {
//     productCards();
//   }

//   productCards = async () => {
//     let href = window.location.href;
//     let sec = href.split("=");
//     await dispatch(getAllProductSearch(sec[sec.length - 1]));
//   };

//   mainPage = () => {
//     return (
//       <div className="product-card mt-1">
//         {products.map((product) => (
//           <div
//             className="card"
//             style={{ display: "inline-block", borderRadius: "1rem" }}
//             key={product._id}
//           >
//             <img
//               src={product.imageUrl[0]}
//               style={{ marginTop: "1rem" }}
//               className="img"
//               alt="..."
//             />
//             <div className="card-body">
//               <h5 className="card-title">
//                 <div className="titleName">{product.name}</div>
//                 <br />
//                 <div className="price">$ {product.price}</div>
//               </h5>
//               <p className="card-text">{product.content}</p>
//               <Link
//                 to={"/productDetail/" + product.slug}
//                 className="btn btn-primary"
//               >
//                 Go to Product
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   render() {
//     const { loading } = this.state;
//     return (
//       <div>
//         {loading ? (
//           <LoadingScreen loading={loading} setLoading={setLoading} />
//         ) : (
//           mainPage()
//         )}
//       </div>
//     );
//   }
// }

// function AllProductCard() {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.searchProductReducer);

//   useEffect(() => {}, [dispatch]);
// }

// function mapStateToProps(state) {
//   return {
//     getAllProductSearch: state.productReducer,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       getAllProductSearchAction: bindActionCreators(
//         productActions.getAllProduct,
//         dispatch
//       ),
//     },
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AllProductCard);

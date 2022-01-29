import React from "react";
import Category from "../categories/Category";
import MainMenu from "../mainMenu/MainMenu";
import Navi from "../navbar/Navi";
import ProductCard from "../products/ProductCard";
import AllProductCard from "../products/AllProductCard";
import { Route, Switch, useHistory } from "react-router-dom";
import ProductDetail from "../products/ProductDetail";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import Cart from "../cart/Cart";
import NotFound from "../notFound/NotFound";
import Profile from "../auth/profile/Profile";
import UpdateProfile from "../auth/profile/UpdateProfile";
import ProductAdd from "../shop/ProductAdd";
import UpdateProduct from "../shop/UpdateProduct";
import DeleteProduct from "../shop/DeleteProduct";
import ForgotPassword from "../auth/forgotPassword/ForgotPassword";
import ResetPassword from "../auth/resetPassword/ResetPassword";

export default function Dashboard() {
  let history = useHistory();
  return (
    <div className="container">
      <Navi history={history} />
      <Category />
      <Switch>
        <Route exact path="/" component={MainMenu} />
        <Route path="/category/:name" component={ProductCard} />
        <Route path="/product" component={AllProductCard} />
        <Route path="/productDetail/:productName" component={ProductDetail} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/profile" component={Profile} />
        <Route
          exact
          path="/profile/profileImage/profileImageDetail/:id"
          component={Profile}
        />
        <Route exact path="/updateProfile" component={UpdateProfile} />
        <Route exact path="/productAdd" component={ProductAdd} />
        <Route path="/updateProduct" component={UpdateProduct} />
        <Route exact path="/deleteProduct" component={DeleteProduct} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route path="/resetPassword" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

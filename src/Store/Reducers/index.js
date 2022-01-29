import { combineReducers } from "redux";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import currentCategoryReducer from "./currentCategory.reducer";
import searchProductReducer from "./searchProduct.reducer";
import loadingScreenReducer from "./loadingScreen.reducer";
import productDetailReducer from "./productDetail.reducer";
import loginReducer from "./login.reducer";
import logoutReducer from "./logout.reducer";
import notLoginReducer from "./notLogin.reducer";
import notLogoutReducer from "./notLogout.reducer";
import localStorageReducer from "./localStorage.reducer";
import logStateReducer from "./logState.reducer";
import productAddToCartReducer from "./productAddToCart.reducer";
import productRemoveFromCartReducer from "./productRemoveFromCart.reducer";
import fullProductRemoveFromCartReducer from "./fullProductRemoveFromCart.reducer";
import registerReducer from "./register.reducer";
import likeProductReducer from "./likeProduct.reducer";
import undoLikeProductReducer from "./undoLikeProduct.reducer";
import forgotPasswordReducer from "./forgotPassword.reducer";
import resetPasswordReducer from "./resetPassword.reducer";
import profileReducer from "./profile.reducer";
import profileImageUploadReducer from "./profileImageUpload.reducer";
import profileImageStaticReducer from "./profileImageStatic.reducer";
import profileEditReducer from "./profileEdit.reducer";
import profileImageLocalReducer from "./profileImageLocal.reducer";
import productAddReducer from "./productAdd.reducer";
import productAddImageReducer from "./productAddImage.reducer";
import productAddImageStaticReducer from "./productAddImageStatic.reducer";
import productUpdateReducer from "./productUpdate.reducer";
import productUpdateImageReducer from "./productUpdateImage.reducer";
import getUserCartReducer from "./getUserCart.reducer";
import productDeleteReducer from "./productDelete.reducer";

const rootReducer = combineReducers({
  categoryReducer,
  productReducer,
  currentCategoryReducer,
  searchProductReducer,
  loadingScreenReducer,
  productDetailReducer,
  loginReducer,
  notLoginReducer,
  notLogoutReducer,
  localStorageReducer,
  logoutReducer,
  logStateReducer,
  productAddToCartReducer,
  productRemoveFromCartReducer,
  fullProductRemoveFromCartReducer,
  registerReducer,
  likeProductReducer,
  undoLikeProductReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  profileReducer,
  profileImageUploadReducer,
  profileImageStaticReducer,
  profileEditReducer,
  profileImageLocalReducer,
  productAddReducer,
  productAddImageReducer,
  productAddImageStaticReducer,
  productUpdateReducer,
  productUpdateImageReducer,
  getUserCartReducer,
  productDeleteReducer,
});

export default rootReducer;

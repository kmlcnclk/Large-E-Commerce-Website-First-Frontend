import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../../Store/Actions/login.actions";
import * as localStorageActions from "../../../Store/Actions/localStorage.actions";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    data: {},
    errorMessage: "",
    route: false,
    isValid: false,
    isNotValid: false,
  };

  loginFormSubmit = async (e) => {
    e.preventDefault();
    await this.props.actions.loginAction(this.state.email, this.state.password);

    if (this.props.login) {
      this.setState({ data: this.props.login });
      this.setState({ isValid: true });
      this.setState({ isNotValid: false });
      alertify.success(this.state.data.name);

      this.setState({ route: true });
      this.props.actions.localStorageAction(this.props.login);
      this.props.actions.logStateAction(false);
    } else {
      this.setState({ errorMessage: this.props.notLogin });
      this.setState({ isValid: false });
      this.setState({ isNotValid: true });
      alertify.error(this.state.errorMessage);
      this.setState({ route: false });
    }

    setTimeout(() => {
      if (this.state.route) {
        this.props.history.push("/");
      }
    }, 1000);
  };

  // changeEmail = (e) => {
  //   this.setState({ email: e.target.value });
  // };
  // changePassword = (e) => {
  //   this.setState({ password: e.target.value });
  // };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="login">
        <div className="login-mainDiv">
          <form className="form-signin" onSubmit={this.loginFormSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please login</h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="loginEmail"
              className={`form-control  ${
                this.state.isValid ? "is-valid" : null
              } ${this.state.isNotValid ? "is-invalid" : null}`}
              placeholder="Email address"
              required
              autoFocus
              value={this.state.email}
              onChange={this.changeInput}
              name="email"
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              className={`form-control  ${
                this.state.isValid ? "is-valid" : null
              } ${this.state.isNotValid ? "is-invalid" : null}`}
              placeholder="Password"
              name="password"
              required
              value={this.state.password}
              onChange={this.changeInput}
            />
            <div className="checkbox mb-3">
              <Link
                to="/forgotPassword"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot password ?
              </Link>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.loginReducer,
    notLogin: state.notLoginReducer,
    localStorage: state.localStorageReducer,
    logState: state.logStateReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loginAction: bindActionCreators(loginActions.login, dispatch),
      localStorageAction: bindActionCreators(
        localStorageActions.localStorage,
        dispatch
      ),
      logStateAction: bindActionCreators(loginActions.logState, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from "react";
import "./Register.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registerActions from "../../../Store/Actions/register.actions";
import * as loginActions from "../../../Store/Actions/login.actions";
import * as localStorageActions from "../../../Store/Actions/localStorage.actions";
import * as profileImageUploadActions from "../../../Store/Actions/profileImageUpload.actions";
import alertify from "alertifyjs";

class Register extends Component {
  state = {
    email: "",
    password: "",
    data: {},
    errorMessage: "",
    route: false,
    name: "",
    profile_image: {},
  };

  registerFormSubmit = async (e) => {
    e.preventDefault();
    await this.props.actions.registerAction(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.profile_image
    );

    if (this.props.register.success === true) {
      this.setState({ data: this.props.register.data });
      alertify.success(this.state.data.name);
      this.setState({ route: true });
      this.props.actions.localStorageAction(this.props.register.data);
      // await this.props.actions.profileImageUploadAction(
      //   this.state.profile_image
      // );

      // await window.localStorage.removeItem("User");
      // this.props.actions.localStorageAction(this.props.profileImageUpload.data);

      this.props.actions.logStateAction(false);
    } else {
      this.setState({ errorMessage: this.props.register.message });
      alertify.error(this.state.errorMessage);
      this.setState({ route: false });
    }

    setTimeout(() => {
      if (this.state.route) {
        this.props.history.push("/");
      }
    }, 1000);
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileChangeInput = async (e) => {
    const file = e.target.files[0];
    await this.setState({ profile_image: file });
  };

  render() {
    return (
      <div className="register">
        <div className="register-mainDiv">
          <form className="form-register" onSubmit={this.registerFormSubmit}>
            <h1 className="h3 mb-3 text-center font-weight-normal">
              Please register
            </h1>

            <label htmlFor="inputName" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="registerName"
              className="form-control"
              placeholder="Name"
              required
              autoFocus
              value={this.state.name}
              onChange={this.changeInput}
              name="name"
            />

            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="registerEmail"
              className="form-control"
              placeholder="Email address"
              required
              value={this.state.email}
              onChange={this.changeInput}
              name="email"
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="registerPassword"
              className="form-control"
              placeholder="Password"
              name="password"
              required
              value={this.state.password}
              onChange={this.changeInput}
            />
            <div id="profileImageRegisterForm">
              <label
                htmlFor="inputPassword"
                className="ml-1"
                style={{ fontSize: "0.95rem" }}
              >
                <strong> Profile Image :</strong>
              </label>
              <input
                onChange={this.fileChangeInput}
                className="form-control"
                type="file"
                id="profileImageRegister"
                name="profile_image"
              />
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    register: state.registerReducer,
    localStorage: state.localStorageReducer,
    logState: state.logStateReducer,
    profileImageUpload: state.profileImageUploadReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      registerAction: bindActionCreators(registerActions.register, dispatch),
      localStorageAction: bindActionCreators(
        localStorageActions.localStorage,
        dispatch
      ),
      logStateAction: bindActionCreators(loginActions.logState, dispatch),
      profileImageUploadAction: bindActionCreators(
        profileImageUploadActions.profileImageUpload,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

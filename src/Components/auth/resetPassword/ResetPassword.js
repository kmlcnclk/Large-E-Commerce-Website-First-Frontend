import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./ResetPassword.css";
import * as resetPasswordActions from "../../../Store/Actions/resetPassword.actions";
import alertify from "alertifyjs";

class ResetPassword extends Component {
  state = {
    password: "",
    passwordRepeat: "",
  };

  resetPassword = async (e) => {
    e.preventDefault();

    if (this.state.password === this.state.passwordRepeat) {
      const token = window.location.href;
      const resetPasswordToken = token.split("=");

      await this.props.actions.resetPasswordAction(
        this.state.password,
        resetPasswordToken[resetPasswordToken.length - 1]
      );
      if (this.props.resetPassword.success === true) {
        alertify.success(this.props.resetPassword.message);

        setTimeout(() => {
          this.props.history.push("/");
        }, 1000);
      } else {
        alertify.error(this.props.resetPassword.message);
      }
    } else {
      alertify.error("The passwords you entered do not match");
    }

    this.setState({ password: "" });
    this.setState({ passwordRepeat: "" });
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="resetPassword">
        <div className="resetPassword-mainDiv">
          <form className="form-resetPassword" onSubmit={this.resetPassword}>
            <h1 className="h3 mb-3 font-font-weight-normal">Reset password</h1>
            <label htmlFor="resetPasswordPassword" className="sr-only">
              New Password
            </label>
            <input
              type="password"
              id="resetPasswordPassword"
              className="form-control"
              placeholder="Your new password"
              required
              autoFocus
              value={this.state.password}
              onChange={this.changeInput}
              name="password"
            />
            <input
              type="password"
              id="resetPasswordRepeatPassword"
              className="form-control"
              placeholder="Repeat your new password"
              required
              autoFocus
              value={this.state.passwordRepeat}
              onChange={this.changeInput}
              name="passwordRepeat"
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Reset your password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resetPassword: state.resetPasswordReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      resetPasswordAction: bindActionCreators(
        resetPasswordActions.resetPassword,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

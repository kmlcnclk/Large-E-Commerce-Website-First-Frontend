import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./ForgotPassword.css";
import * as forgotPasswordActions from "../../../Store/Actions/forgotPassword.actions";
import alertify from "alertifyjs";

class ForgotPassword extends Component {
  state = {
    email: "",
  };

  forgotPassword = async (e) => {
    e.preventDefault();

    await this.props.actions.forgotPasswordAction(this.state.email);
    if (this.props.forgotPassword.success === true) {
      alertify.success(this.props.forgotPassword.message);
    } else {
      alertify.error(this.props.forgotPassword.message);
    }

    this.setState({ email: "" });
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="forgotPassword">
        <div className="forgotPassword-mainDiv">
          <form className="form-forgotPassword" onSubmit={this.forgotPassword}>
            <h1 className="h3 mb-3 font-font-weight-normal">Forgot password</h1>
            <label htmlFor="forgotPasswordEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="forgotPasswordEmail"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              value={this.state.email}
              onChange={this.changeInput}
              name="email"
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Send your email
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    forgotPassword: state.forgotPasswordReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      forgotPasswordAction: bindActionCreators(
        forgotPasswordActions.forgotPassword,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

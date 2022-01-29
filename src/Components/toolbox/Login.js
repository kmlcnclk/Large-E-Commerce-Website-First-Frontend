import React, { Component } from "react";
import alertify from "alertifyjs";

export default class Login extends Component {
  loginFormSubmit = async (e) => {
    e.preventDefault();
    await this.props.actions.loginAction(this.state.email, this.state.password);

    if (this.props.login) {
      this.setState({ data: this.props.login });
      alertify.success(this.state.data.name);
      this.setState({ route: true });
    } else {
      this.setState({ errorMessage: this.props.notLogin });
      alertify.error(this.state.errorMessage);
      this.setState({ route: false });
    }

    setTimeout(() => {
      if (this.state.route) {
        window.history.back();
      }
    }, 1000);
  };

  render() {
    return <div></div>;
  }
}

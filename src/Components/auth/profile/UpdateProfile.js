import alertify from "alertifyjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as profileEditActions from "../../../Store/Actions/profileEdit.actions";
import {
  addLocal,
  deleteLocal,
} from "../../../Store/Actions/localStorage.actions";
import "./UpdateProfile.css";

class UpdateProfile extends Component {
  state = {
    user: {},
    name: "",
    password: "",
    email: "",
    profile_image: {},
    errorMessage: "",
    route: false,
  };

  async componentDidMount() {
    if (window.localStorage.getItem("User")) {
      const user = await JSON.parse(window.localStorage.getItem("User"))[0];
      this.setState({ password: user.password });
      this.setState({ email: user.email });
      this.setState({ name: user.name });
      this.setState({ profile_image: user.profile_image });
    } else {
      alertify.error("You cannot enter here without logging in");
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    }
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileChangeInput = async (e) => {
    const file = e.target.files[0];
    await this.setState({ profile_image: file });
  };
  updateProfileFormSubmit = async (e) => {
    e.preventDefault();

    await this.props.actions.profileEditAction(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.profile_image
    );

    if (this.props.profileEdit.success) {
      await deleteLocal();
      this.setState({ user: this.props.profileEdit.data });
      alertify.success(this.state.user.name + "Update Profile");
      addLocal(this.state.user);
      this.setState({ route: true });
    } else {
      this.setState({ errorMessage: this.props.profileEdit.message });
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
            onSubmit={this.updateProfileFormSubmit}
          >
            <h1 className="h3 mb-3 text-center font-weight-normal">
              Please update profile {this.state.user.name}
            </h1>

            <label htmlFor="inputName" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="updateProfileName"
              className="form-control"
              placeholder="Name"
              required
              value={this.state.name}
              autoFocus
              onChange={this.changeInput}
              name="name"
            />

            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="updateProfileEmail"
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
              id="updateProfilePassword"
              className="form-control"
              placeholder="Password"
              name="password"
              required
              onChange={this.changeInput}
            />
            <div id="updateProfileImageForm">
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
                id="updateProfileImage"
                name="profile_image"
              />
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Update profile
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileEdit: state.profileEditReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      profileEditAction: bindActionCreators(
        profileEditActions.profileEdit,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);

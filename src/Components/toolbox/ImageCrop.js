import React, { PureComponent } from "react";
import { RiCloseLine } from "react-icons/ri";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addLocal } from "../../Store/Actions/localStorage.actions";
import * as profileImageUploadctions from "../../Store/Actions/profileImageUpload.actions";
import "./ImageCrop.css";
import alertify from "alertifyjs";

class ImageCrop extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1,
    },
    btnState: false,
    blobState: "",
    imageFileUrl: "",
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  clikBtn = async () => {
    if (this.state.src) {
      await this.props.actions.profileImageUploadAction(this.state.blobState);
      if (this.props.profileImageUpload.success) {
        await window.localStorage.removeItem("User");
        await addLocal(this.props.profileImageUpload.data);
        await this.props.setImageState(this.state.imageFileUrl);

        alertify.success(this.props.profileImageUpload.message);
        this.props.setImageState2(false);
      }
    } else {
      alertify.error("You did not choose a picture");
    }
  };

  profileImageClosePopupMenu = () => {
    this.props.setImageState2(false);
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        this.setState({ blobState: blob });
        this.setState({ imageFileUrl: this.fileUrl });
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }
  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return this.props.trigger ? (
      <div className="profileImageCropPopup">
        <div className="profileImageCropPopup-inner">
          <div className="profileImageCropPopupName">
            <strong>Edit Profile Image</strong>
          </div>
          <div
            className="d-inline-block"
            style={{
              textAlign: "center",
              marginLeft: "2rem",
              marginRight: "auto",
            }}
          >
            <input
              type="file"
              className="form-control d-inline-block"
              accept="image/*"
              onChange={this.onSelectFile}
            />
          </div>
          <RiCloseLine
            className="imageCropClose"
            size={35}
            onClick={this.profileImageClosePopupMenu}
          />
          {this.state.src ? (
            <div className="d-flex justify-content-center mt-5 mb-4">
              {src && (
                <div
                  style={{
                    width: "150px",
                    textAlign: "center",
                    height: "150px",
                    margin: "1rem",
                  }}
                >
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onChange={this.onCropChange}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                  />
                </div>
              )}

              <div style={{ margin: "1rem" }}>
                {croppedImageUrl && (
                  <img
                    alt="Crop"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                    src={croppedImageUrl}
                  />
                )}
              </div>
            </div>
          ) : null}
          <button
            className="btn btn-danger d-inline-block btn-block"
            onClick={this.clikBtn}
            style={{ marginTop: "2rem" }}
          >
            Change Profile Image
          </button>
        </div>
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    profileImageUpload: state.profileImageUploadReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      profileImageUploadAction: bindActionCreators(
        profileImageUploadctions.profileImageUpload,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCrop);

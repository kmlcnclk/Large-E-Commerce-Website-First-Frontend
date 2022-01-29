import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import ImageCrop from "../../toolbox/ImageCrop";

export default function ProfileImage(props) {
  const [imageState, setImageState] = useState(null);
  const [imageState2, setImageState2] = useState(false);

  const profileImageStatePopupMenu = () => {
    setImageState2(true);
  };

  return (
    <div className="profile-imgDiv">
      <img
        src={imageState === null ? props.profileImageStatic : imageState}
        className="profile-img"
        alt="ProfileImage"
      />
      <MdEdit
        color="black"
        size={25}
        onClick={profileImageStatePopupMenu}
        style={{
          position: "absolute",
          top: "22rem",
          cursor: "pointer",
          left: "27rem",
          margin: "0.2rem",
        }}
      />
      {imageState2 ? (
        <ImageCrop
          imageState2={imageState2}
          setImageState={setImageState}
          setImageState2={setImageState2}
          trigger={true}
        />
      ) : null}
    </div>
  );
}

import React from "react";
import { useHistory } from "react-router-dom";

export default function DropDown() {
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}

import React from "react";
import PropTypes from "prop-types";
import OverlayStyle from "./ModalOverlay.module.css";

export default function ModalOverlay({ closeModalOverlay }) {
  return (
    <div onClick={closeModalOverlay} className={OverlayStyle.mainOverlay}></div>
  );
}
ModalOverlay.propTypes = {
  closeModalOverlay: PropTypes.func.isRequired,
};

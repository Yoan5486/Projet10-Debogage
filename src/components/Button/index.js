import React, { useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";

export const BUTTON_TYPES = {
  DEFAULT: 1,
  SUBMIT: 2,
};

const Button = ({ title, onClick, type, disabled, children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = (e) => {
    setIsSubmitted(true);
    onClick(e);
    setTimeout(() => setIsSubmitted(false), 3000); // Réinitialise après 3 secondes
  };

  const buttonText = isSubmitted ? "Réponse envoyée" : children;

  switch (type) {
    case BUTTON_TYPES.DEFAULT:
      return (
        <button
          type="button"
          disabled={disabled || isSubmitted}
          className="Button"
          data-testid="button-test-id"
          onClick={handleClick}
          title={title}
        >
          {buttonText}
        </button>
      );
    case BUTTON_TYPES.SUBMIT:
      return (
        <input
          disabled={disabled || isSubmitted}
          className="Button"
          type="submit"
          data-testid="button-test-id"
          value={buttonText}
          onClick={handleClick}
          title={title}
        />
      );
    default:
      return (
        <button
          type="button"
          disabled={disabled || isSubmitted}
          className="Button"
          data-testid="button-test-id"
          onClick={handleClick}
          title={title}
        >
          {buttonText}
        </button>
      );
  }
};


Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.number,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  type: BUTTON_TYPES.DEFAULT,
  title: "",
  children: null
}

export default Button;

import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../containers/Modal";

import "./style.scss";

export const BUTTON_TYPES = {
  DEFAULT: 1,
  SUBMIT: 2,
};

const Button = ({ title, onClick, type, disabled, children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = (e) => {
    onClick(e);
    setIsOpened(true); // Ouvre la modale
  };

  return (
    <>
      {/* La modale sera affichée ici si `isOpened` est true */}
      <Modal
        opened={isOpened}
        Content={
          <div>
            <p>Message envoyé !</p>
            <button
              type="button"
              onClick={() => setIsOpened(false)} // Ferme la modale
            >
              Fermer
            </button>
          </div>
        }
      >
        {() => {}}
      </Modal>

      {/* Bouton rendu via le switch */}
      {(() => {
        switch (type) {
          case BUTTON_TYPES.DEFAULT:
            return (
              <button
                type="button"
                disabled={disabled}
                className="Button"
                data-testid="button-test-id"
                onClick={handleClick}
                title={title}
              >
                {children}
              </button>
            );
          case BUTTON_TYPES.SUBMIT:
            return (
              <input
                disabled={disabled}
                className="Button"
                type="submit"
                data-testid="button-test-id"
                value={children}
                onClick={handleClick}
                title={title}
              />
            );
          default:
            return (
              <button
                type="button"
                disabled={disabled}
                className="Button"
                data-testid="button-test-id"
                onClick={handleClick}
                title={title}
              >
                {children}
              </button>
            );
        }
      })()}
    </>
  );
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
  children: null,
};

export default Button;

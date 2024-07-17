import PropTypes from "prop-types";

import {  defaultTransition } from "../../styles/globals";
import globalButtonVariants from "../../styles/globals.button";


const Button = ({
  children = "Button",
  className = "",
  size = "md",
  variant = "primary",
  icon = "",
  rounded = "xl",
  onClick = () => {},
  transition = defaultTransition,
  inverseIcon = false,
  disabled = false,
  block = false,
  loading = false,
  type = ""
}) => {
  const buttonClass = `${globalButtonVariants.constants} ${globalButtonVariants.radious[rounded]} ${
    block ? "w-full" : "w-fit"
  } ${
    disabled ? globalButtonVariants.variant.disabled : globalButtonVariants.variant[variant]
  } ${transition} ${globalButtonVariants.size[size]} ${className} ${
    icon ? (inverseIcon ? "flex-row-reverse" : "flex-row") : ""
  } overflow-hidden select-none flex items-center justify-center text-base font-RobotoMd`;

  return (
    <button disabled={disabled} type={type} onClick={onClick} className={buttonClass}>
      {loading ? (
        <i className="animate-spin bi-hourglass-top"></i>
      ) : icon ? (
        <>
          <i className={`${icon} ${size === "md" ? "" : "text-icon"}`}></i>
          <p>{children}</p>
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  variant: PropTypes.string,
  icon: PropTypes.string,
  rounded: PropTypes.string,
  onClick: PropTypes.func,
  transition: PropTypes.string,
  inverseIcon: PropTypes.bool,
  block: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string
};

export default Button;

import PropTypes from "prop-types";
import {  defaultTransition } from "../../styles/globals";
import globalButtonVariants from "../../styles/globals.button";
import DefaultLoader from "../loader/DefaultLoader.jsx";


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
  } overflow-hidden select-none flex items-center justify-center  font-RobotoMd`;

  return (
    <button disabled={disabled} type={type} onClick={onClick} className={buttonClass}>
      {loading ? (
        <DefaultLoader className="size-4 border-4 border-white-100"/>
      ) : icon ? (
        <>
          <i className={`${icon} ${globalButtonVariants.iconSize[size]}`}></i>
          <p className={globalButtonVariants.textSize[size]}>{children}</p>
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.string,
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

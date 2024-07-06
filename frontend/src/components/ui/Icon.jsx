
import PropTypes from "prop-types";
import { defaultTransition } from "../../styles/globals";
import globalIconVariants from "../../styles/global.icon";


const iconSizeVariant = {
  md: "size-10 p-2",
  lg: "size-12 p-2",
};

const Icon = ({
  icon = "bi-rocket",
  size = "lg",
  variant = "primary",
  className = "",
  transition = defaultTransition,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={` ${globalIconVariants.constant}  ${
        disabled ? globalIconVariants.variant.disabled : globalIconVariants.variant[variant]
      } ${iconSizeVariant[size]} ${transition} ${className}
       `}
      onClick={onClick}
    >
      <i className={`${icon} ${size === "md" ? "" : "text-icon"}`}></i>
    </button>
  );
};

Icon.propTypes = {
  icon : PropTypes.string,
  size : PropTypes.string,
  variant : PropTypes.string,
  className : PropTypes.string,
  transition : PropTypes.string,
  onClick : PropTypes.func,
  disabled : PropTypes.bool

}

export default Icon;

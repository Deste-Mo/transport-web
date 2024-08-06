/**
 *  Under development
 */

import PropTypes from "prop-types";

const Badge = ({
  className,
  value = "badge",
  size = "lg",
  icon,
  iconColor = "primary",
  variant = "primary"
}) => {
  const sizeVariant = {
    md: "px-2 py-1 text-small-2",
    lg: "px-2 py-2 text-small-1",
  };
  const iconColorVariant = {
    primary: "text-primary",
    danger: "text-danger",
    success: "text-success",
    warning: "text-warning",
    black: "text-black",
  };
  return (
    <div
      className={`rounded-md border border-black-10 bg-black-10 flex gap-2 ${sizeVariant[size]} ${className}`}
    >
      {icon && <i className={` ${icon} ${iconColorVariant[iconColor]}`}></i>}
      <p>{value}</p>
    </div>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  variant : PropTypes.string,
};
export default Badge;

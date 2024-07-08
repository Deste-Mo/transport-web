import PropTypes from "prop-types";
import globalSwitchboxVariants from "../../styles/global.switchbox";

const Switchbox = ({
  className = "",
  label,
  onChange = () => {},
  onError = () => {},
  variant = "primary",
  size = "md",
  rounded = "default",
  disabled = false,
  name,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        disabled={disabled}
        name={name}
        onChange={(e) => {
          onChange(e);
          onError(!e.target.checked, e);
        }}
        type="checkbox"
        className="sr-only peer"
      />
      <div
        className={`${globalSwitchboxVariants.constants} ${globalSwitchboxVariants.size[size]}
        ${globalSwitchboxVariants.radious[rounded]} ${globalSwitchboxVariants.variant[variant]}
        ${className}`}
      ></div>
      {label && (
        <span className="ms-3 text-base text-white select-none">{label}</span>
      )}
    </label>
  );
};

Switchbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export default Switchbox;

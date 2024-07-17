import PropTypes from "prop-types";
import globalCheckboxVariants from "../../styles/global.checkbox";


const Checkbox = ({
  name,
  label,
  id = name,
  variant = "primary",
  size = "md",
  rounded = "default",
  disabled = false,
  onChange = () => {},
  onError = () => {},
}) => (
  <div className="flex w-full gap-2">
    <input
      disabled={disabled}
      onChange={(e) => {
        onChange(e);
        onError(!e.target.checked, e);
      }}
      name={name}
      id={id}
      className={`${globalCheckboxVariants.constant} ${globalCheckboxVariants.size[size]}  ${globalCheckboxVariants.variant[variant]} ${globalCheckboxVariants.radious[rounded]}`}
      type="checkbox"
    />
    <svg
      className={`absolute pointer-events-none hidden peer-checked:block stroke-white outline-none ${globalCheckboxVariants.size[size]}`}
      // xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <label className="cursor-pointer select-none text-white" htmlFor={id}>
      {label}
    </label>
  </div>
);

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onError: PropTypes.func,
};

export default Checkbox;

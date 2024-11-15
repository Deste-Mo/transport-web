import PropTypes from "prop-types";

import { useEffect } from "react";
import { globalInputVariants } from "../../styles/globals.input";

const TextArea = ({
  className = "",
  variant = "fill",
  placeholder = "Indication here ...",
  title = "",
  errorMsg = "",
  name = "",
  size = globalInputVariants.size.default,
  rounded = globalInputVariants.rounded.default,
  isValid = true,
  pattern = /./,
  block = false,
  onChange = () => {},
  onError = () => {},
  inputRef,
  value,
  resize = true,
    titleIcon = "",
    required=true
}) => {
  const error = !isValid || !pattern.test(value);
  useEffect(() => {
    onError(error, { target: { name: name } });
  }, [value]);

  return (
    <div
      className={`flex  flex-col gap-2 ${
        block ? "w-full" : globalInputVariants.width
      }`}
    >
      <div className="flex items-center gap-2">
        {titleIcon && <i className={`${titleIcon} text-primary-100`}></i>}
        <p className="text-base font-thin text-black-100 dark:text-white-100">{title}</p>
      </div>
      <textarea
          ref={inputRef}
          className={`h-[128px]  ${globalInputVariants.constant} ${
              globalInputVariants.rounded[rounded]
          } ${globalInputVariants.variant[variant]} ${
              globalInputVariants.size[size]
          }   ${globalInputVariants.size[size]}
        ${!resize && "resize-none"}  ${className}`}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
          name={name}
          value={value}
          autoComplete="off"
          required={required}
      />
      {error && value && (
          <small className="text-small text-danger">{errorMsg}</small>
      )}
    </div>
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  errorMsg: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.string,
  isValid: PropTypes.bool,
  pattern: PropTypes.instanceOf(RegExp),
  block: PropTypes.bool,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resize: PropTypes.bool,
};

export default TextArea;

import PropTypes from "prop-types";

import {useEffect} from "react";
import {globalInputVariants} from "../../styles/globals.input";

const TextInput = ({
                       className = "",
                       variant = "fill",
                       type = "text",
                       placeholder = "Indication here ...",
                       title = "",
                       errorMsg = "Erreur",
                       name = "",
                       size = globalInputVariants.size.default,
                       rounded = globalInputVariants.rounded.default,
                       isValid = true,
                       pattern = /^.+$/,
                       block = false,
                       onChange = () => {
                       },
                       onError = () => {
                       },
                       inputRef,
                       value,
                       required = true,
                   }) => {
    const error = !isValid || !pattern?.test(value);
    useEffect(() => {
        onError(error, {target: {name: name}});
    }, [value]);

    return (
        <div className={`flex  flex-col gap-2 ${block ? 'w-full' : globalInputVariants.width}`}>
            <p className="text-base font-thin text-black-100 dark:text-white">{title}</p>
            <input
                ref={inputRef}
                type={type}
                className={`${globalInputVariants.constant} ${
                    globalInputVariants.rounded[rounded]
                } ${globalInputVariants.variant[variant]} ${
                    globalInputVariants.size[size]
                }   ${globalInputVariants.size[size]}
        }  ${className}`}
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
                <small className="text-small text-danger-100">{errorMsg}</small>
            )}
        </div>
    );
};

TextInput.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.string,
    type: PropTypes.string,
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
        PropTypes.shape({current: PropTypes.instanceOf(Element)}),
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextInput;

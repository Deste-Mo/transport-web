import PropTypes from "prop-types";
import Icon from "./Icon";

const Toast = ({
  className = "",
  error = false,
  message = "message",
  onClick = () => {},
}) => {
  return (
    <div
      className={`flex items-center gap-6 bg-white-100 dark:bg-white-0 dark:backdrop-blur-sm border border-black-0  py-3 px-6 rounded-xl justify-between w-fit dark:text-white-100 ${
        !error
          ? "bg-success-100 text-black-100"
          : "bg-danger-100 text-black-100"
      }  ${className} `}
    >
      <i
        className={`${
          !error ? "bi bi-check-circle-fill text-success-100" : "bi bi-exclamation-circle-fill text-danger-100"
        } text-icon`}
      ></i>
      <div className="flex flex-col">
        {/* <p className="text-lead">{error ? "success" : "Error"}</p> */}
        <p className={`text-base text-black-80 text-nowrap dark:text-white-80`}>
          {message || "Some message"}
        </p>
      </div>
      <Icon
        onClick={onClick}
        className="text-white"
        size="sm"
        icon="bi-x-lg"
        variant="transparent"
      />
    </div>
  );
};

Toast.propTypes = {
  className : PropTypes.string,
  error : PropTypes.bool,
  message : PropTypes.string,
  handleClick : PropTypes.func
}

export default Toast;

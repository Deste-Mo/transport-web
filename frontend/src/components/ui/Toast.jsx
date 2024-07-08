import PropTypes from "prop-types";
import Icon from "./Icon";

const Toast = ({
  className = "",
  error = false,
  message = "message",
  handleClick = () => {},
}) => {
  return (
    <div
      className={`flex items-center gap-6  py-1 px-3 rounded-lg justify-between w-fit ${
        !error
          ? "dark:text-success dark:bg-success-40 bg-success text-white"
          : "dark:text-danger bg-danger text-white dark:bg-danger-40"
      }  ${className} `}
    >
      <i
        className={`${
          !error ? "bi bi-check-lg" : "bi bi-exclamation-lg"
        } text-icon`}
      ></i>
      <div className="flex flex-col ">
        {/* <p className="text-lead">{error ? "success" : "Error"}</p> */}
        <p className={`text-small-1 text-white-60 font-FuturaThin`}>
          {message || "Some message"}
        </p>
      </div>
      <Icon
        onClick={handleClick}
        className="text-white"
        size="md"
        icon="bi-x-lg"
        variant="transparent"
      />
    </div>
  );
};

Toast.propTypes = {
  className : PropTypes.string,
  error : PropTypes.string,
  message : PropTypes.string,
  handleClick : PropTypes.func
}

export default Toast;

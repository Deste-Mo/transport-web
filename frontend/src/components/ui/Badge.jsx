import PropTypes from "prop-types";

const Badge = ({ icon, text, active = false, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className={` ${
        active && "bg-primary-80  dark:bg-primary-40"
      } text-small-2 rounded-full px-4 py-2 bg-primary-20 flex gap-2 cursor-pointer border border-primary-20 hover:bg-primary-80 group dark:hover:bg-primary-40 dark:text-white-100 dark:bg-primary-10`}
    >
      {icon && (
        <i
          className={`${icon} ${
            active && "text-black-100 dark:text-white-100"
          } text-primary-100 dark:group-hover:text-white-100 group-hover:text-black-100`}
        ></i>
      )}
      <p>{text}</p>
    </div>
  );
};

Badge.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};

export default Badge;

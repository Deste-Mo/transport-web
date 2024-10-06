import PropTypes from "prop-types";

const Badge = (
  {
    icon,
    text,
    active = false,
    onClick = () => { },
    badgeClassName,
    iconClassName
  }) => {
  return (
    <div
      onClick={onClick}
      className={` ${active && "bg-primary-80  dark:bg-primary-40"
        } text-small-2 rounded-full cursor-pointer px-4 py-2 bg-primary-20 flex gap-2 select-none   group dark:bg-primary-20 dark:text-white-100  ${badgeClassName}`}
    >
      {icon && (
        <i
          className={`${icon} ${active && "text-black-100 dark:text-white-100"
            } text-primary-100  ${iconClassName}`}
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

// className={` ${active && "bg-primary-80  dark:bg-primary-40"
// } text-small-2 rounded-full px-4 py-2 bg-primary-20 flex gap-2 cursor-pointer  hover:bg-primary-80 group dark:bg-primary-20 dark:text-white-100  ${badgeClassName}`}
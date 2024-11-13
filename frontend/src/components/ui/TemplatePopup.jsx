import { useEffect, useRef } from "react";

const TemplatePopup = ({ setPopupVisible, popupVisible, children, className , hideOnOutsideClick = true}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    
    if (hideOnOutsideClick)     {
      const handleClickOutside = (e) => {
        if (selectRef.current && !selectRef.current.contains(e.target)) {
          setPopupVisible(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
   popupVisible && ( <div
    ref={selectRef}
    className={`flex select-none flex-col items-center z-40 justify-center gap-4 w-max  rounded-xl bg-secondary-l dark:bg-secondary-d dark:backdrop-blur-sm shadow-sm border border-black-0 overflow-hidden ${className}`}
  >
    <div>
      {children}
    </div>
  </div>)
  );
};

export default TemplatePopup;

export const OptionItem = ({ name, icon, onClick, inverseIcon = true, iconClassName, setPopupVisible = () => {}}) => {
  return (
    <div
      className={`flex items-center text-text-l dark:text-text-d z-40 justify-between w-full px-6 py-3 hover:bg-primary-d/10 dark:hover:bg-primary-l/10 black-10  gap-x-4 cursor-pointer border-b border-black-0  ${inverseIcon ? 'flex-row-reverse' : 'flex-row'} `}
      onClick={() => {
        onClick();
        setPopupVisible(false);
      }}
    >
      {icon && <i className={`${icon} ${iconClassName}`}></i>}
      <p className="text-small-1 ">{name}</p>
    </div>
  );
};

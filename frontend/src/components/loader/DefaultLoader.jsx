import "../../animations/loader.css";

const DefaultLoader = ({className = "fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 size-[54px]", border = " border-4 border-primary-100"}) => {
  return <div className={`loader  ${border} ${className}`} />;
};

export default DefaultLoader;

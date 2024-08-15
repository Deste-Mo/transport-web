import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [heigth, setWeigth] = useState(window.innerHeight);

  useEffect(() => {
    const Resize = () => {
      setWidth(window.innerWidth);
      setWeigth(window.innerHeight);
    };
    window.addEventListener("resize", Resize);

    return () => {
      window.removeEventListener("resize", Resize);
    };
  }, []);

  return [width, heigth];
};

export default useWindowSize;

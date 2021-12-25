import { useEffect, useState } from "react";

interface IWindowSize {
  width: number | null;
  height: number | null;
}

const useWindowSize = (): IWindowSize => {
  const [windowSize, setwindowSize] = useState<IWindowSize>({
    width: null,
    height: null,
  });

  // create a debounce function to get window size
  const debounce = (func: any, wait: number) => {
    let timeout: any;
    return function (this: any) {
      const context = this;
      const args = arguments;
      const later = () => {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // get window size
  const getWindowSize = () => {
    const width = window.innerWidth || document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;
    setwindowSize({ width, height });
  };

  useEffect(() => {
    getWindowSize();
    const debouncedGetWindowSize = debounce(getWindowSize, 100);
    window.addEventListener("resize", debouncedGetWindowSize);
    return () => {
      window.removeEventListener("resize", debouncedGetWindowSize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;

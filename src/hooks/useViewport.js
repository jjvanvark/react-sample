import React, { useContext, createContext, useState, useEffect } from "react";

function getCurrentBreakpoint(width) {
  if (width >= largeBreakpoint) {
    return "xl";
  } else if (width >= breakpoint) {
    return "l";
  } else {
    return "s";
  }
}

const ViewportContext = createContext();

const Viewport = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint(width));

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setBreakpoint(getCurrentBreakpoint(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width, breakpoint }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const breakpoint = 900;
export const largeBreakpoint = 1200;

export const useViewport = () => {
  const { width } = useContext(ViewportContext);
  return width;
};

export const useBreakpoint = () => {
  const { breakpoint } = useContext(ViewportContext);
  return breakpoint;
};

export default Viewport;

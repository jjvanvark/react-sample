import { useState, useEffect } from "react";
import { useBreakpoint } from "../hooks/useViewport";
import { useSwipeable } from "react-swipeable";
import SliderPagination from "./SliderPagination";

const getMaxSlides = (size, breakpoint) => {
  const amount = breakpoint === "xl" ? 3 : breakpoint === "l" ? 2 : 1;
  const rest = size % amount;
  const result = size === 0 ? 0 : (size - rest) / amount - (rest === 0 ? 1 : 0);
  return result;
};

const Slider = ({ children, color }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const breakpoint = useBreakpoint();
  const [maxSlides, setMaxSlides] = useState(() => {
    return getMaxSlides(children.length, breakpoint);
  });

  useEffect(() => {
    const newMaxSlides = getMaxSlides(children.length, breakpoint);
    setMaxSlides(newMaxSlides);
    if (currentSlide >= newMaxSlides) {
      setCurrentSlide(newMaxSlides);
    }
  }, [breakpoint, children.length, currentSlide]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleNextSlide();
    },
    onSwipedRight: () => {
      handlePreviousSlide();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleGoto = (slide) => {
    setCurrentSlide(slide);
  };

  return (
    <div className="slider" {...handlers}>
      <div className="container">
        <div
          className="row slider__row"
          style={{
            left: `calc(${currentSlide * -1}00% + ${currentSlide * -2}rem)`,
            width:
              breakpoint === "s"
                ? `calc(${children.length}00% + ${children.length * 2}rem)`
                : "",
          }}
        >
          {children.map((c, index) => {
            return (
              <div key={index} className="col-1 col-l-1o2 col-xl-1o3">
                {c}
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-1">
            <SliderPagination
              currentSlide={currentSlide}
              maxSlides={maxSlides}
              gotoSlide={handleGoto}
              next={handleNextSlide}
              prev={handlePreviousSlide}
              color={color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

import { ArrowLeft, ArrowRight } from "./Icons";

const SliderPagination = ({
  currentSlide,
  maxSlides,
  gotoSlide,
  next,
  prev,
  color = "blue",
}) => {
  if (maxSlides === 0) {
    return <></>;
  }
  return (
    <div className={`slider-pagination slider-pagination--${color}`}>
      <button className="slider-pagination__button" onClick={prev}>
        <ArrowLeft />
      </button>
      <div className="slider-pagination__dots">
        {Array.apply(null, { length: maxSlides + 1 }).map((_, i) => {
          return (
            <button
              key={i}
              onClick={() => gotoSlide(i)}
              className={`slider-pagination__dot-button ${
                i === currentSlide
                  ? "slider-pagination__dot-button--active"
                  : ""
              }`}
            ></button>
          );
        })}
      </div>
      <button className="slider-pagination__button" onClick={next}>
        <ArrowRight />
      </button>
    </div>
  );
};

export default SliderPagination;

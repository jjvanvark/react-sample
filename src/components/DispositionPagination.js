import IconButton from "./IconButton";
import { ArrowLeft, ArrowRight } from "./Icons";

const DispositionPagination = ({
  current,
  maximum,
  request = (page) => null,
}) => {
  const handleNext = () => {
    if (current < maximum - 1) {
      request(current + 1);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      request(current - 1);
    }
  };

  if (maximum <= 1) {
    return <></>;
  }

  return (
    <div className="disposition-pagination">
      <IconButton
        onClick={handlePrevious}
        className="disposition-pagination__button"
      >
        <ArrowLeft />
      </IconButton>
      <span className="disposition-pagination__label">
        {current + 1}
        {" / "}
        {maximum}
      </span>
      <IconButton
        onClick={handleNext}
        className="disposition-pagination__button"
      >
        <ArrowRight />
      </IconButton>
    </div>
  );
};

export default DispositionPagination;

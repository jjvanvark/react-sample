import { useEffect } from "react";
import { useState, useDispatch } from "../hooks/useReducer";
import { useViewport, breakpoint } from "../hooks/useViewport";
import { AreaIcon } from "./Icons";
import IconButton from "./IconButton";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

const AreaModal = () => {
  const navigate = useNavigate();
  const { areaFilterOpen, areas } = useState();
  const dispatch = useDispatch();
  const width = useViewport();

  useEffect(() => {
    document.body.classList.toggle("modal-open", areaFilterOpen);
    if (!areaFilterOpen) {
      document.getElementById("modal-area").scrollTop = 0;
    }
  }, [areaFilterOpen]);

  useEffect(() => {
    if (width >= breakpoint && areaFilterOpen) {
      dispatch({ type: "close_area_filter" });
    }
  }, [width, dispatch, areaFilterOpen]);

  const handlers = useSwipeable({
    onSwiped: () => dispatch({ type: "close_area_filter" }),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleCloseModal = () => dispatch({ type: "close_area_filter" });

  const handleFilterButtonClick = (id, state) => {
    navigate("/maatregelen");
    dispatch({ type: "set_area", payload: { id, state } });
  };

  const handleResetFilters = () => {
    dispatch({ type: "deactivate_all_filters" });
  };

  return (
    <div
      id="modal-area"
      className={`area-modal ${areaFilterOpen ? "area-modal--open" : ""}`}
      onClick={handleCloseModal}
    >
      <div
        className="area-modal__content"
        onClick={(e) => e.stopPropagation()}
        {...handlers}
      >
        <div className="container">
          <div className="row">
            <div className="col-1">
              <div className="area-modal__title-bar">
                <h2 className="area-modal__title">Gebieden</h2>
                <button
                  className="area-modal__title-button"
                  onClick={handleResetFilters}
                >
                  reset alle filters
                </button>
              </div>
              {areas.map(({ value, label, active }, index) => (
                <button
                  key={index}
                  className={`area-filter__button ${
                    active ? "area-filter__button--active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterButtonClick(value, !active);
                  }}
                >
                  <span className="area-filter__button-icon">
                    <AreaIcon id={value} />
                  </span>
                  {label}
                </button>
              ))}
              <IconButton
                className="area-modal__text-button"
                glow={true}
                onClick={handleCloseModal}
              >
                SLUITEN
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaModal;

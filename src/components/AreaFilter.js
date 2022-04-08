import { useState, useDispatch } from "../hooks/useReducer";
import { AreaIcon, Filter } from "./Icons";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";

const AreaFilter = ({ count }) => {
  const navigate = useNavigate();
  const { areas } = useState();
  const dispatch = useDispatch();

  const handleFilterButtonClick = (id, state) => {
    navigate("/maatregelen");
    dispatch({ type: "set_area", payload: { id, state } });
  };

  const handleOpenFilterPanelClick = () => {
    dispatch({ type: "open_area_filter" });
  };

  return (
    <div className="area-filter">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="area-filter__content-mobile">
              <h2>{count} Gevonden resultaten</h2>
              <IconButton onClick={handleOpenFilterPanelClick}>
                <Filter />
              </IconButton>
            </div>
            <div className="area-filter__content">
              <h3 className="area-filter__title">Gebied:</h3>
              {areas.map(({ value, label, active }, index) => (
                <button
                  key={index}
                  className={`area-filter__button ${
                    active ? "area-filter__button--active" : ""
                  }`}
                  onClick={() => handleFilterButtonClick(value, !active)}
                >
                  <span className="area-filter__button-icon">
                    <AreaIcon id={value} />
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaFilter;

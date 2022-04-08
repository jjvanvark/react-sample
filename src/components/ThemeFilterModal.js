import { useEffect } from "react";
import { useState, useDispatch } from "../hooks/useReducer";
import { useViewport, breakpoint } from "../hooks/useViewport";

const FilterItem = ({ handleClick, label, value, active, index }) => (
  <li className="mobile-filter__list-item">
    <input
      type="checkbox"
      id={`${value}-cluster-filter-${index}`}
      checked={active}
      onChange={(e) => {
        handleClick(value, e.target.checked);
      }}
    />
    <label htmlFor={`${value}-cluster-filter-${index}`}>{label}</label>
  </li>
);

const ThemeFilterModal = () => {
  const { themeFilterOpen, clusters, developments } = useState();
  const dispatch = useDispatch();
  const width = useViewport();

  useEffect(() => {
    document.body.classList.toggle("modal-open", themeFilterOpen);
    if (!themeFilterOpen) {
      document.getElementById("modal-theme-filter").scrollTop = 0;
    }
  }, [themeFilterOpen]);

  useEffect(() => {
    if (width >= breakpoint && themeFilterOpen) {
      dispatch({ type: "close_theme_filter" });
    }
  }, [width, dispatch, themeFilterOpen]);

  const handleClosePanel = () => {
    dispatch({ type: "close_theme_filter" });
  };

  const handleClusterClick = (id, state) => {
    dispatch({ type: "set_cluster", payload: { id, state } });
  };

  const handleDevelopmentClick = (id, state) => {
    dispatch({ type: "set_development", payload: { id, state } });
  };

  const handleClearAll = () => {
    dispatch({ type: "reset_development" });
    dispatch({ type: "reset_all_clusters" });
  };

  return (
    <div
      className={`mobile-filter ${
        themeFilterOpen ? "mobile-filter--visible" : ""
      }`}
      onClick={handleClosePanel}
    >
      <div
        className="mobile-filter__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="mobile-filter__close-button"
          onClick={handleClosePanel}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <rect
              x="16"
              y="11"
              width="2"
              height="8"
              transform="rotate(90 16 11)"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className="mobile-filter__inner-panel" id="modal-theme-filter">
          <div className="container">
            <div className="row">
              <div className="col-1">
                <div className="mobile-filter__top-bar">
                  <h2 className="mobile-filter__top-bar-title">Filtering</h2>
                  <button
                    className="mobile-filter__top-bar-button"
                    onClick={handleClearAll}
                  >
                    wis alle filters
                  </button>
                </div>
                {clusters.length > 0 && (
                  <div className="mobile-filter__list-panel">
                    <h3 className="mobile-filter__list-panel-title">
                      Clusters
                    </h3>
                    <ul className="mobile-filter__list">
                      {clusters.map((cluster, index) => (
                        <FilterItem
                          {...cluster}
                          index={index}
                          key={index}
                          handleClick={handleClusterClick}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                {developments.length > 0 && (
                  <div className="mobile-filter__list-panel">
                    <h3 className="mobile-filter__list-panel-title">
                      Ontwikkelingen lange termijn
                    </h3>
                    <ul className="mobile-filter__list">
                      {developments.map((development, index) => (
                        <FilterItem
                          {...development}
                          index={index}
                          key={index}
                          handleClick={handleDevelopmentClick}
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeFilterModal;

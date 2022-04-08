import { useEffect, useState as useReactState } from "react";
import { useState, useDispatch } from "../hooks/useReducer";
import IconButton from "./IconButton";
import { Filter, Arrow } from "./Icons";
import { useViewport, breakpoint } from "../hooks/useViewport";
import DevFilterItem from "./DevFilterITem";

const ThemeFilter = ({ children }) => {
  const { clusters, developments, developmentsOverlayOpen } = useState();
  const dispatch = useDispatch();
  const width = useViewport();
  const [currentDevelopments, setCurrentDevelopments] =
    useReactState(developments);

  useEffect(() => {
    if (!developmentsOverlayOpen) {
      setCurrentDevelopments(developments);
    }
  }, [developments]);

  useEffect(() => {
    if (width < breakpoint && developmentsOverlayOpen) {
      dispatch({ type: "close_developments_overlay" });
    }
  }, [width, developmentsOverlayOpen, dispatch]);

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        dispatch({ type: "close_developments_overlay" });
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [dispatch]);

  const developmentColumnsAmount = Math.ceil(developments.length / 3);

  const handleOpenPanelClick = () => {
    dispatch({ type: "open_theme_filter" });
  };

  const handleClusterClick = (id, state) => {
    dispatch({ type: "set_cluster", payload: { id, state } });
  };

  const handleOpenDevelopmentsOverlay = () => {
    if (developmentsOverlayOpen) {
      handleCloseDevFilterClick();
    } else {
      dispatch({ type: "open_developments_overlay" });
    }
  };

  const handleDevFilterClick = (id, state) => {
    setCurrentDevelopments((old) => {
      return old.map((item) => {
        if (item.value === id) {
          item.active = state;
        }
        return item;
      });
    });
  };

  const handleCloseDevFilterClick = () => {
    dispatch({ type: "close_developments_overlay" });
    dispatch({ type: "set_developments", payload: currentDevelopments });
  };

  return (
    <div className="theme-filter">
      <div className="container theme-filter__mobile">
        <div className="row">
          <div className="col-1">
            <div className="theme-filter__content-mobile">
              <div>{children}</div>
              <IconButton onClick={handleOpenPanelClick}>
                <Filter />
              </IconButton>
            </div>
            <div className="theme-filter__content"></div>
          </div>
        </div>
      </div>
      <div className="theme-filter__cluster-panel">
        <div className="container theme-filter__desktop ">
          <div className="row">
            <div className="col-1">
              <ul className="theme-filter__cluster-list">
                {clusters.map((cluster, index) => (
                  <li key={index} className="theme-filter__cluster-list-item">
                    <input
                      type="checkbox"
                      id={`cluster-filter-${index}`}
                      checked={cluster.active}
                      onChange={(e) => {
                        handleClusterClick(cluster.value, e.target.checked);
                      }}
                    />
                    <label htmlFor={`cluster-filter-${index}`}>
                      {cluster.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container theme-filter__desktop">
        <div className="row">
          <div className="col-1">
            <div className="theme-filter__development">
              <button
                className={`button theme-filter__development-button ${
                  developmentsOverlayOpen
                    ? "theme-filter__development-button--active"
                    : ""
                }`}
                onClick={handleOpenDevelopmentsOverlay}
              >
                Ontwikkelingen lange termijn
                <span className="theme-filter__development-button-icon">
                  <Arrow />
                </span>
              </button>

              <div
                className={`theme-filter-overlay__backdrop ${
                  developmentsOverlayOpen
                    ? "theme-filter-overlay__backdrop--open"
                    : ""
                }`}
                onClick={handleOpenDevelopmentsOverlay}
              ></div>
              <div
                className={`theme-filter-overlay ${
                  developmentsOverlayOpen ? "theme-filter-overlay--open" : ""
                }`}
              >
                <div className="theme-filter-overlay__column">
                  <ul className="theme-filter-overlay__column-list">
                    {currentDevelopments
                      .slice(0, developmentColumnsAmount)
                      .map((dev, index) => (
                        <DevFilterItem
                          {...dev}
                          key={index}
                          callback={handleDevFilterClick}
                        />
                      ))}
                  </ul>
                </div>
                <button
                  onClick={handleCloseDevFilterClick}
                  className=" icon-mobile-button "
                  style={{
                    backgroundColor: "#4c91bf",
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "6px" }}>Toon resultaten</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.33333 11.3571C5.33333 11.1866 5.40357 11.0231 5.5286 10.9026C5.65362 10.782 5.82319 10.7143 6 10.7143H10C10.1768 10.7143 10.3464 10.782 10.4714 10.9026C10.5964 11.0231 10.6667 11.1866 10.6667 11.3571C10.6667 11.5276 10.5964 11.6912 10.4714 11.8117C10.3464 11.9323 10.1768 12 10 12H6C5.82319 12 5.65362 11.9323 5.5286 11.8117C5.40357 11.6912 5.33333 11.5276 5.33333 11.3571ZM2.66667 7.5C2.66667 7.3295 2.7369 7.16599 2.86193 7.04543C2.98695 6.92487 3.15652 6.85714 3.33333 6.85714H12.6667C12.8435 6.85714 13.013 6.92487 13.1381 7.04543C13.2631 7.16599 13.3333 7.3295 13.3333 7.5C13.3333 7.6705 13.2631 7.83401 13.1381 7.95457C13.013 8.07513 12.8435 8.14286 12.6667 8.14286H3.33333C3.15652 8.14286 2.98695 8.07513 2.86193 7.95457C2.7369 7.83401 2.66667 7.6705 2.66667 7.5ZM0 3.64286C0 3.47236 0.070238 3.30885 0.195262 3.18829C0.320287 3.06773 0.489856 3 0.666667 3H15.3333C15.5101 3 15.6797 3.06773 15.8047 3.18829C15.9298 3.30885 16 3.47236 16 3.64286C16 3.81335 15.9298 3.97687 15.8047 4.09743C15.6797 4.21798 15.5101 4.28571 15.3333 4.28571H0.666667C0.489856 4.28571 0.320287 4.21798 0.195262 4.09743C0.070238 3.97687 0 3.81335 0 3.64286Z"
                      fill="white"
                    ></path>
                  </svg>
                </button>
                <div className="theme-filter-overlay__column">
                  <ul className="theme-filter-overlay__column-list">
                    {currentDevelopments
                      .slice(
                        developmentColumnsAmount,
                        2 * developmentColumnsAmount
                      )
                      .map((dev, index) => (
                        <DevFilterItem
                          {...dev}
                          key={index}
                          callback={handleDevFilterClick}
                        />
                      ))}
                  </ul>
                </div>
                <div className="theme-filter-overlay__column">
                  <ul className="theme-filter-overlay__column-list">
                    {currentDevelopments
                      .slice(2 * developmentColumnsAmount)
                      .map((dev, index) => (
                        <DevFilterItem
                          {...dev}
                          key={index}
                          callback={handleDevFilterClick}
                        />
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeFilter;

import { useState, useEffect } from "react";
import { useDispatch, useState as useReducerState } from "../hooks/useReducer";
import { useLocation } from "react-router-dom";
import { getImage } from "../helpers/imageParse";
import { AreaIcon } from "./Icons";
import wordListParser from "../helpers/wordList";
import ReactHtmlParser from "react-html-parser";

const DispositionCard = (props) => {
  const { inhoud = {}, title, modal = false, id, hideTheme = false } = props;
  const {
    toelichting,
    gebied = [],
    hoofdafbeelding,
    periodeStart = "",
    periodeEind = "",
  } = inhoud;

  let theme = "";
  let color = props.color;

  const year = periodeStart.slice(0, 4) + " - " + periodeEind.slice(0, 4);
  const image = getImage(hoofdafbeelding);
  const [content, setContent] = useState(ReactHtmlParser("<p>Mother</p>"));

  useEffect(() => {
    if (toelichting !== undefined) {
      console.log("mother", toelichting);
      setContent(wordListParser(toelichting));
    }
  }, [toelichting]);

  const [contentOpen, setContentOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const dispatch = useDispatch();
  const { dispositionModalOpen, areas, dispositionColors } = useReducerState();
  const location = useLocation();

  if (!!id) {
    const r = !!dispositionColors[id]
      ? dispositionColors[id]
      : { color, title: "" };
    color = r.color;
    theme = r.title;
  }

  useEffect(() => {
    dispatch({ type: "close_disposition_modal" });
  }, [location, dispatch]);

  const handleContentClick = () => {
    if (!contentOpen) {
      setAreaOpen(false);
    }
    setContentOpen((old) => !old);
  };

  const handleAreaClick = () => {
    if (!areaOpen) {
      setContentOpen(false);
    }
    setAreaOpen((old) => !old);
  };

  const handleMobileClick = () => {
    if (dispositionModalOpen) {
      dispatch({
        type: "close_disposition_modal",
      });
    } else {
      dispatch({
        type: "open_disposition_modal",
        payload: { theme, inhoud, title, color },
      });
    }
  };

  return (
    <div
      className={`dispositionCard dispositionCard--${color} ${
        modal ? "dispositionCard--modal" : ""
      }`}
    >
      <div
        className="dispositionCard__theme"
        style={hideTheme ? { padding: "0" } : {}}
      >
        {`Thema: ${theme}`}
        <button
          className="dispositionCard__mobile-button"
          onClick={handleMobileClick}
          style={hideTheme ? { top: "-20px" } : {}}
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
            {!modal && (
              <rect x="11" y="8" width="2" height="8" fill="currentColor" />
            )}
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
      </div>
      <div className="dispositionCard__title">
        <span className="dispositionCard__title-inner">{`Maatregel: ${title}`}</span>
      </div>
      <div className="dispositionCard__content">
        <span
          className={`dispositionCard__content-inner ${
            contentOpen ? " dispositionCard__content-inner--open" : ""
          }`}
        >
          {content}
        </span>
        <button
          className="icon-button dispositionCard__button"
          onClick={handleContentClick}
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
            {!contentOpen && (
              <rect x="11" y="8" width="2" height="8" fill="currentColor" />
            )}
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
      </div>
      <div className="dispositionCard__year">{year}</div>
      <div className="dispositionCard__area">
        <span className="dispositionCard__area-inner">Gebied: </span>
        <button
          className="icon-button dispositionCard__button"
          onClick={handleAreaClick}
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
            {!areaOpen && (
              <rect x="11" y="8" width="2" height="8" fill="currentColor" />
            )}
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
        <div
          className={`dispositionCard__area-expand ${
            areaOpen && "dispositionCard__area-expand--open"
          }`}
        >
          <ul className="dispositionCard__area-list">
            {areas.map((a, i) => {
              return (
                <li
                  className={`dispositionCard__area-list-item ${
                    gebied.includes(a.value)
                      ? "dispositionCard__area-list-item--active"
                      : ""
                  }`}
                  key={i}
                >
                  <AreaIcon id={a.value} />
                  {a.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={`dispositionCard__image ${
          contentOpen ? "dispositionCard__image--open-content" : ""
        } ${areaOpen ? "dispositionCard__image--open-area" : ""}`}
        style={{
          backgroundImage: `${
            image === "" ? "" : `url(${process.env.REACT_APP_HOST}${image})`
          }`,
        }}
      ></div>
    </div>
  );
};

export default DispositionCard;

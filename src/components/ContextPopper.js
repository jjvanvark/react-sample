import { useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import { wordList } from "../helpers/wordList";

const ContextPopper = ({ title }) => {
  const [visible, setVisibility] = useState(false);
  const [content, setContent] = useState("");

  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes, update } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [0, 0],
          },
        },
      ],
    }
  );

  useEffect(() => {
    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    wordList.forEach((item) => {
      if (title === item.title) {
        setContent(item.content);
      }
    });
  }, [title]);

  function handleDocumentClick(event) {
    if (referenceRef.current.contains(event.target)) {
      return;
    }
    setVisibility(false);
  }
  function handleDropdownOpenClick(event) {
    if (!visible) {
      setVisibility(true);
      update();
    }
  }
  function handleDropdownCloseClick(event) {
    if (visible) {
      setVisibility(false);
      update();
    }
  }
  return (
    <>
      <button
        ref={referenceRef}
        onMouseEnter={handleDropdownOpenClick}
        onClick={handleDropdownOpenClick}
        onMouseLeave={handleDropdownCloseClick}
        className="context-popper__button"
      >
        {title}
      </button>
      <span
        ref={popperRef}
        style={{ ...styles.popper, zIndex: 10 }}
        {...attributes.popper}
      >
        <span
          style={styles.offset}
          className={`context-popper__panel ${
            visible ? " context-popper__panel--visible" : ""
          }`}
        >
          <span className="context-popper__title">{title}</span>
          <span>{content}</span>
        </span>
      </span>
    </>
  );
};

export default ContextPopper;

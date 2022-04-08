import { useEffect, useState } from "react";
import { useState as useReducerState, useDispatch } from "../hooks/useReducer";
import DispositionCard from "./DispositionCard";
import { useViewport, breakpoint } from "../hooks/useViewport";

const DispositionModal = () => {
  const { dispositionModal, dispositionModalOpen = false } = useReducerState();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const width = useViewport();

  useEffect(() => {
    document.body.classList.toggle("modal-open", dispositionModalOpen);
    setLoaded(dispositionModalOpen);
    if (!dispositionModalOpen) {
      document.getElementById("modal-disposition").scrollTop = 0;
    }
  }, [dispositionModalOpen]);

  useEffect(() => {
    if (width >= breakpoint && dispositionModalOpen) {
      dispatch({ type: "close_disposition_modal" });
    }
  }, [width, dispatch, dispositionModalOpen]);

  const onBackdropClick = () => {
    dispatch({ type: "close_disposition_modal" });
  };

  return (
    <div
      id="modal-disposition"
      className={`disposition-modal ${
        dispositionModalOpen
          ? `disposition-modal--open disposition-modal--open--${dispositionModal.color}`
          : ""
      } ${
        dispositionModal !== null
          ? `disposition-modal--${dispositionModal.color}`
          : ""
      } ${loaded ? "disposition-modal--animate" : ""}`}
      onClick={onBackdropClick}
    >
      <div className="container">
        <div className="row">
          <div className="col-1o1">
            <DispositionCard {...dispositionModal} modal={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispositionModal;

import { useEffect, useRef, useState } from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import YouTube from "react-youtube";
import CloseIcon from "../assets/close-icon.svg";
import { useLocation } from "react-router-dom";

function YouTubeGetID(url) {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

const VideoModal = () => {
  const { pathname } = useLocation();
  const [videoId, setVideoId] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { videoModal } = useGlobalState();
  const dispatch = useDispatch();
  const video = useRef();

  useEffect(() => {
    document.body.classList.toggle("modal-open", videoModal !== null);

    if (videoModal !== null) {
      setVideoId(YouTubeGetID(videoModal));
      setCurrentLocation(pathname);
    } else {
      if (!!video?.current) {
        video?.current.getInternalPlayer().pauseVideo();
      }
    }
  }, [videoModal, pathname]);

  useEffect(() => {
    if (currentLocation !== null && videoModal !== null) {
      if (pathname !== currentLocation) {
        dispatch({ type: "close_video" });
      }
    }
  }, [pathname, currentLocation, videoModal, dispatch]);

  const handleCloseModal = () => dispatch({ type: "close_video" });

  return (
    <div
      className={`video-modal ${
        videoModal !== null ? "video-modal--open" : ""
      }`}
      onClick={handleCloseModal}
    >
      <img
        src={CloseIcon}
        alt="close icon"
        className="video-modal__close-icon"
      />
      {videoId !== null && <YouTube ref={video} videoId={videoId} />}
    </div>
  );
};

export default VideoModal;

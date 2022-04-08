import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { getTheme } from "../api";
import { Link, useNavigate } from "react-router-dom";
import DispositionSlider from "../components/DispositionSlider";
import { ArrowRight, ArrowLeft } from "../components/Icons";
import { getImage } from "../helpers/imageParse";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import { colorByCluster } from "../helpers/colorCluster";
import kader from "../assets/kader.png";
import LogoDelfsland from "../assets/logo-delfsland.svg";
import PlayIcon from "../assets/play-icon.svg";
import ReactHtmlParser from "react-html-parser";
import wordListParser from "../helpers/wordList";

const renameList = [
  {
    old: "Richtlijn Overstromingsrisico’s (Ror)",
    new: "Overstromingsrisico’s",
  },
  {
    old: "Richting een circulaire waterketen",
    new: "Transitie waterketen",
  },
  {
    old: "Transporteren, zuiveren en slib verwerken",
    new: "Transporteren en zuiveren van afvalwater",
  },
  {
    old: "Waterkwaliteit",
    new: "Waterkwaliteit, pijler 1: KRW",
  },
  {
    old: "Overig Water",
    new: "Waterkwaliteit, pijler 2: Overig water",
  },
  {
    old: "Overige water",
    new: "Waterkwaliteit, pijler 2: Overig water",
  },
  {
    old: "Zoetwatervoorziening en coördinatie droogte",
    new: "Zoetwatervoorziening en droogte",
  },
  {
    old: "Personeel & organisatie",
    new: "Personeel en organisatie",
  },
  {
    old: "Regulering & toezicht",
    new: "Regulering en toezicht",
  },
];

const optionallyRename = (title) => {
  for (let i = 0; i < renameList.length; i++) {
    if (renameList[i].old === title) {
      return renameList[i].new;
    }
  }
  return title;
};

const ThemaDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [theme, setTheme] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const { clusters, globalThemes } = useGlobalState();
  const dispatch = useDispatch();
  const [afb1, setAfb1] = useState(null);
  const [afb2, setAfb2] = useState(null);
  const [afb3, setAfb3] = useState(null);
  const [video, setVideo] = useState(null);
  const [docs, setDocumenten] = useState([]);
  const [links, setLinks] = useState([]);
  const [toelichting, setToelichting] = useState(ReactHtmlParser(""));

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    getTheme(id)
      .then((r) => {
        setTheme(r);
        const {
          inhoud = {},
          documenten = [],
          interneLinks = [],
          externeLinks = [],
        } = r;
        const {
          hoofdafbeelding = null,
          afbeelding2 = null,
          afbeelding3 = null,
          videoURL = null,
          toelichting = "",
        } = inhoud;
        const retrievedHoofdafbeelding =
          hoofdafbeelding === null ? null : getImage(hoofdafbeelding);
        setAfb1(retrievedHoofdafbeelding);
        setAfb2(
          afbeelding2 === null
            ? retrievedHoofdafbeelding
            : getImage(afbeelding2)
        );
        setAfb3(
          afbeelding3 === null
            ? retrievedHoofdafbeelding
            : getImage(afbeelding3)
        );
        setVideo(videoURL);
        setDocumenten(documenten);
        setLinks(interneLinks.concat(externeLinks));
        setTitle(r.title);

        setToelichting(wordListParser(toelichting));
      })
      .catch(() => setError(true));
  }, [id, theme?.inhoud?.toelichting]);

  const handleClusterClick = (c) => {
    dispatch({ type: "reset_all_clusters" });
    dispatch({ type: "reset_development" });
    dispatch({ type: "set_cluster", payload: { id: c.value, state: true } });
    navigate("/themas");
  };

  const handleVideoButton = () => {
    if (video !== null) {
      dispatch({ type: "open_video", payload: video });
    }
  };

  const getThemeIdByTitle = (t) => {
    let result = "";
    const title = optionallyRename(t);
    globalThemes.forEach(({ label, id }) => {
      if (label === title) {
        result = "/" + id;
      }
    });
    return result;
  };

  if (theme === null) {
    return <></>;
  }

  return (
    <div
      className={`ClusterDetail cluster--waterkwantiteit ClusterDetail--${colorByCluster(
        theme.inhoud.cluster
      )}`}
    >
      <Link className="ClusterDetail-back" to="/themas">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 22.0887L12.3694 15.4497L20 8.71007L18.3153 7L9 15.4497L18.3153 24L20 22.0887Z"
            fill="white"
          />
        </svg>
      </Link>
      <div className="ClusterDetail-header">
        <div className="container">
          <div className="row">
            <div className="col-1o2">
              <Link to="/">
                <img src={LogoDelfsland} alt="Delfsland" />
              </Link>
            </div>
            <div className="col-1o2 text-align-right">
              <Link to="/">
                <svg
                  width="278"
                  height="43"
                  viewBox="0 0 278 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.5044 40.6621H27.0057L22.24 26.1956C21.6623 24.2959 21.0847 22.5424 20.6514 20.3505C20.0738 22.8347 19.4961 25.0265 18.774 27.3646L14.586 40.6621H8.3761L0 13.0442H6.4987L10.1091 25.9033C10.8312 28.5336 11.5532 31.1638 12.1309 33.648C12.7086 30.8716 13.4306 28.5336 14.0083 26.0494L18.1964 13.0442H24.1174L28.3055 25.9033C29.3164 29.2642 29.894 31.31 30.4717 33.648C31.0493 31.0177 31.627 28.972 32.3491 26.1956L36.1039 13.1903H42.1693L33.5044 40.6621Z"
                    fill="#242D5F"
                  />
                  <path
                    d="M60.9429 40.662C60.9429 38.9084 60.9429 37.0088 61.2317 35.5475C59.932 38.7623 56.466 41.2465 52.1335 41.2465C47.5122 41.2465 44.4795 38.3239 44.4795 33.794C44.4795 27.5106 50.6894 24.0036 60.654 24.0036V22.3962C60.654 18.8891 59.2099 17.1356 54.8774 17.1356C52.2779 17.1356 49.1008 18.0124 46.9346 19.1814L46.0681 14.3592C48.812 13.3363 52.2779 12.6057 55.7439 12.6057C64.12 12.6057 66.4307 16.2589 66.4307 21.9578V36.132C67.7304 36.4243 69.6078 36.5704 71.1964 36.7165V40.3697C68.1636 40.662 64.12 40.9542 60.9429 40.662ZM60.5096 27.949C52.2779 27.949 50.1117 30.287 50.1117 32.9173C50.1117 35.1092 51.5559 36.5704 53.8665 36.5704C57.9101 36.5704 60.5096 32.625 60.5096 28.6796V27.949Z"
                    fill="#242D5F"
                  />
                  <path
                    d="M84.9155 41.2465C79.1389 41.2465 77.2615 38.9085 77.2615 32.7712V17.7202H72.0625V13.0442H77.2615V4.27658L83.1825 2.66919V13.0442H90.2589V17.7202H83.1825V31.0177C83.1825 35.1092 84.049 36.2782 86.7929 36.2782C87.9482 36.2782 89.1035 36.1321 90.1144 35.8399L90.5477 40.662C89.1035 40.9543 86.7929 41.2465 84.9155 41.2465Z"
                    fill="#242D5F"
                  />
                  <path
                    d="M117.987 27.3646H100.657C100.513 33.648 103.112 36.4244 108.744 36.4244C111.344 36.4244 114.088 35.8399 116.543 34.817L117.265 39.4931C114.377 40.6621 111.055 41.2466 107.589 41.2466C99.213 41.2466 94.4473 36.8628 94.4473 27.0723C94.4473 18.7431 99.0686 12.4597 107.011 12.4597C114.81 12.4597 118.131 17.7203 118.131 24.0037C118.131 24.8804 118.131 26.1956 117.987 27.3646ZM106.867 16.9896C103.545 16.9896 101.235 19.4738 100.802 23.2731H112.355C112.355 19.4738 110.333 16.9896 106.867 16.9896Z"
                    fill="#242D5F"
                  />
                  <path
                    d="M140.661 18.4507C134.884 17.2817 132.285 21.2271 132.285 29.5563V40.808H126.508V17.7201C125.208 17.4278 123.331 17.2817 121.742 17.1356V13.4824C124.775 13.1901 128.819 12.8979 132.14 13.044C132.14 14.6514 131.851 16.9894 131.562 19.1813H131.707C132.862 15.5282 135.606 12.0211 140.949 12.6056L140.661 18.4507Z"
                    fill="#242D5F"
                  />
                  <path
                    d="M226.877 27.3646H209.547C209.402 33.648 212.002 36.4244 217.634 36.4244C220.234 36.4244 222.977 35.8399 225.433 34.817L226.155 39.4931C223.266 40.6621 219.945 41.2466 216.479 41.2466C208.103 41.2466 203.337 36.8628 203.337 27.0723C203.337 18.7431 207.958 12.4597 215.901 12.4597C223.7 12.4597 227.021 17.7203 227.021 24.0037C227.165 24.8804 227.021 26.1956 226.877 27.3646ZM215.757 16.9896C212.435 16.9896 210.124 19.4738 209.691 23.2731H221.244C221.389 19.4738 219.223 16.9896 215.757 16.9896Z"
                    fill="#242D5F"
                  />
                  <path
                    d="M249.55 18.4507C243.774 17.2817 241.174 21.2271 241.174 29.5563V40.808H235.398V17.7201C234.098 17.4278 232.22 17.2817 230.632 17.1356V13.4824C233.665 13.1901 237.708 12.8979 241.03 13.044C241.03 14.6514 240.741 16.9894 240.452 19.1813H240.597C241.752 15.5282 244.496 12.0211 249.839 12.6056L249.55 18.4507Z"
                    fill="#242D5F"
                  />
                  <path
                    d="M270.635 40.662L261.248 26.6338V40.662H255.327V4.71491C254.028 4.42266 252.15 4.27653 250.562 4.1304V0.477245C253.594 0.184993 257.638 -0.107259 261.248 0.0388677V24.8803L270.058 13.0441H277.278L267.169 25.611L278 40.662H270.635Z"
                    fill="#242D5F"
                  />
                  <path
                    d="M197.127 20.7888L195.394 22.5423C194.383 23.5652 192.795 23.5652 191.784 22.6884C189.04 20.0582 185.718 17.1356 183.841 15.8205C183.408 15.5283 182.974 15.5283 182.685 15.8205C181.675 16.5511 180.375 17.7201 179.508 18.4508C175.898 21.6656 174.454 22.8346 172.865 22.8346C171.277 22.8346 169.832 21.5194 166.511 18.743C165.5 17.8663 163.911 16.405 162.756 15.6744C162.467 15.3821 161.89 15.3821 161.601 15.6744C159.868 16.8434 156.546 19.912 153.947 22.5423C152.936 23.5652 151.347 23.5652 150.336 22.5423L148.459 20.7888C157.268 11.8751 160.012 10.1216 162.178 10.1216C164.2 10.1216 166.222 11.8751 169.832 14.9437C170.555 15.5283 171.421 16.405 172.143 16.9895C172.576 17.2818 173.01 17.2818 173.443 16.9895C174.309 16.2589 175.32 15.3821 176.187 14.6515C180.086 11.2906 181.53 10.1216 183.119 10.1216C184.852 10.1216 187.74 12.0212 197.127 20.7888Z"
                    fill="#206DB5"
                  />
                  <path
                    d="M183.263 43C181.675 43 180.086 41.831 176.331 38.4701C175.465 37.7394 174.454 36.8627 173.587 36.132C173.154 35.8398 172.721 35.8398 172.288 36.132C171.566 36.7165 170.699 37.5933 169.977 38.1778C166.367 41.2465 164.345 43 162.323 43C160.157 43 157.413 41.2465 148.604 32.3328L150.481 30.5792C151.492 29.5564 153.08 29.5564 154.091 30.5792C156.691 33.2095 160.012 36.2782 161.745 37.4472C162.034 37.7394 162.612 37.7394 162.901 37.4472C164.056 36.7165 165.5 35.2553 166.655 34.3785C169.833 31.6021 171.277 30.287 173.01 30.287C174.598 30.287 176.042 31.456 179.653 34.6708C180.519 35.4014 181.819 36.5704 182.83 37.301C183.119 37.5933 183.697 37.5933 183.985 37.301C185.863 35.9859 189.184 33.0634 191.928 30.4331C192.939 29.4102 194.528 29.5564 195.539 30.5792L197.272 32.3328C187.74 41.2465 184.852 43 183.263 43Z"
                    fill="#206DB5"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {theme === null && error && <div>id not found</div>}
      {theme !== null && (
        <>
          <div className="ClusterDetail-body">
            <div className="container">
              <div className="row">
                <div className="col-1">
                  <Link className="ClusterDetail-back-two" to="/themas">
                    <ArrowLeft /> Naar overzicht
                  </Link>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-l-1o3"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <div className="ClusterDetail-title block block--type1">
                    <h1>{title}</h1>
                  </div>
                  <section className="ClusterDetail-intro">
                    {toelichting}
                  </section>
                  <div className="ClusterDetail-legal block">
                    <h2 className="uppercase">Wettelijke Grondslag</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: theme.inhoud.grondslag,
                      }}
                    />
                  </div>
                </div>
                <div className="col-l-2o3">
                  <div className="row">
                    <div className="col-l-5o8 offset-l-3o8">
                      <section className="ClusterDetail-development block block--type2">
                        <h2 className="uppercase">
                          Ontwikkelingen lange termijn
                        </h2>
                        <ul>
                          {theme.inhoud.ontwikkelingLangeTermijn.map(
                            (ontwikkeling, index) => (
                              <li key={index}>{ontwikkeling}</li>
                            )
                          )}
                        </ul>
                      </section>
                    </div>
                    <div className="col-l-5o8 offset-l-1o8">
                      <div className="ClusterDetail__image-one">
                        <div
                          className="ClusterDetail__image-one-inner"
                          style={{
                            backgroundImage: `url(${process.env.REACT_APP_HOST}${afb1})`,
                          }}
                        ></div>
                        <img
                          src={kader}
                          alt="kader"
                          className="ClusterDetail__image-one-img"
                        />
                        {video !== null && (
                          <button
                            className="ClusterDetail__video-button"
                            onClick={handleVideoButton}
                          >
                            <div className="ClusterDetail__video-button-inner">
                              <img src={PlayIcon} alt="play icon" />
                            </div>
                          </button>
                        )}
                      </div>
                      <div className="ClusterDetail-image ClusterDetail-image-1"></div>
                    </div>

                    <div className="col-l-3o8 offset-5o8">
                      <div className="ClusterDetail-image ClusterDetail-image-2">
                        <div
                          className="ClusterDetail-image-2-inner"
                          style={{
                            backgroundImage: `url(${process.env.REACT_APP_HOST}${afb2})`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-l-1o2">
                      <section className="ClusterDetail-objective block block--type1">
                        <h2 className="uppercase">Doel</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: theme.inhoud.doel,
                          }}
                        />
                      </section>
                    </div>

                    <div className="col-l-2o3 offset-l-1o8">
                      <section className="ClusterDetail-ambition block">
                        <h2 className="uppercase">Ambitie</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: theme.inhoud.ambitie,
                          }}
                        />
                      </section>
                    </div>

                    <div className="ClusterDetail-more col-l-5o8 offset-l-3o8">
                      <div className="block ClusterDetail-more-inner">
                        <h2 className="uppercase">Meer weten?</h2>
                        <div>
                          <ul>
                            {docs.map(({ document }, i) => (
                              <li key={`doc-${i}`}>
                                <a
                                  href={`${process.env.REACT_APP_HOST}${document.link}`}
                                  target="_blank"
                                  className="ClusterDetail-download-link"
                                  rel="noreferrer"
                                >
                                  {document.label}
                                </a>
                              </li>
                            ))}
                            {links.map(({ link }, i) => (
                              <li key={`lnk-${i}`}>
                                <a
                                  href={link.link}
                                  target="_blank"
                                  className="ClusterDetail-download-link"
                                  rel="noreferrer"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DispositionSlider
            color={colorByCluster(theme.inhoud.cluster)}
            dispositionIds={theme.maatregelen.map(
              ({ maatregel }) => maatregel.id
            )}
          />
          <div
            className={`container theme-info theme-info--${colorByCluster(
              theme.inhoud.cluster
            )}`}
          >
            <div className="row">
              <div className="col-1 col-l-1o2">
                <div className="theme-info__detail theme-info__detail--top-left">
                  <h2 className="theme-info__title">Dwarsverbanden</h2>
                  <ul className="theme-info__dwars-list">
                    {theme.inhoud.dwarsverbanden.map((d, i) => (
                      <li key={i} className="theme-info__dwars-list-item">
                        <Link
                          to={`/themas${getThemeIdByTitle(d)}`}
                          className="theme-info__dwars-link"
                        >
                          <span>{optionallyRename(d)}</span>
                          <ArrowRight className="theme-info__dwars-icon" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-1 col-l-1o2">
                <div
                  className="theme-info__detail theme-info__detail--top-right"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_HOST}${afb3})`,
                  }}
                ></div>
              </div>
            </div>
            <div className="row">
              <div className="col-1 col-l-1o2">
                <div className="theme-info__detail theme-info__detail--bottom-left">
                  <h2 className="theme-info__title theme-info__cluster-title">
                    Cluster
                    <span className="theme-info__cluster-label">
                      {theme !== null &&
                        !!theme?.inhoud?.cluster &&
                        theme?.inhoud?.cluster}
                    </span>
                  </h2>
                  <div
                    className="theme-info__cluster-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        theme !== null && !!theme?.inhoud?.clustertekst
                          ? theme.inhoud.clustertekst
                          : "",
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-1 col-l-1o2">
                <div className="theme-info__detail theme-info__detail--bottom-right">
                  <h2 className="theme-info__title">Clusters</h2>
                  <ul className="theme-info__clusters-list">
                    {clusters.map((c, i) => (
                      <li className="theme-info__clusters-list-item" key={i}>
                        <button
                          className={`theme-info__clusters-label theme-info__clusters-label--${colorByCluster(
                            c.value
                          )}`}
                          onClick={() => handleClusterClick(c)}
                        >
                          {c.label}
                          <ArrowRight />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemaDetail;

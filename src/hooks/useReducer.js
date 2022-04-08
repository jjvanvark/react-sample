import React, { useContext, useReducer, createContext, useEffect } from "react";
import { getDispositionFacets, getFacets, getThemes } from "../api";
import { colorByCluster } from "../helpers/colorCluster";

const updateClusterOrdering = (c) => {
  let order = 0;

  switch (c.value) {
    case "waterketen":
      order = 4;
      break;
    case "waterveiligheid":
      order = 1;
      break;
    case "waterkwaliteit":
      order = 2;
      break;
    case "waterkwantiteit":
      order = 3;
      break;
    case "organisatie & bestuur":
      order = 5;
      break;
    case "overkoepelende thema’s":
      order = 6;
      break;
    default:
      break;
  }
  return { ...c, order };
};

const initialState = {
  globalThemes: [],
  videoModal: null,
  dispositionModal: null,
  dispositionModalOpen: false,
  areas: [],
  areaFilterOpen: false,
  clusters: [],
  developments: [],
  themeFilterOpen: false,
  developmentsOverlayOpen: false,
  dispositionSearch: "",
  dispositionColors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "open_video":
      return { ...state, videoModal: action.payload };
    case "close_video":
      return { ...state, videoModal: null };
    case "set_global_themes":
      return {
        ...state,
        globalThemes: action.payload.sort((x, y) => {
          const t1 = x.title.toUpperCase();
          const t2 = y.title.toUpperCase();
          return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
        }),
        dispositionColors: action.payload.reduce((acc, elem) => {
          const { inhoud = {}, maatregelen = [], title = "" } = elem;
          const color = colorByCluster(inhoud.cluster);
          maatregelen.forEach(({ maatregel }) => {
            acc[maatregel.id] = { color, title };
          });
          return acc;
        }, {}),
      };
    case "open_disposition_modal":
      return {
        ...state,
        dispositionModal: action.payload,
        dispositionModalOpen: true,
      };
    case "close_disposition_modal":
      return { ...state, dispositionModalOpen: false };
    case "set_all_areas":
      return {
        ...state,
        areas: action.payload
          .sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0))
          .map((area) => {
            return { ...area, active: false };
          }),
      };
    case "set_area":
      return {
        ...state,
        areas: state.areas.map((area) => {
          if (area.value === action.payload.id) {
            return { ...area, active: action.payload.state };
          } else {
            return area;
          }
        }),
      };
    case "open_area_filter":
      return { ...state, areaFilterOpen: true };
    case "close_area_filter":
      return { ...state, areaFilterOpen: false };
    case "deactivate_all_filters":
      return {
        ...state,
        areas: state.areas.map((area) => {
          return { ...area, active: false };
        }),
      };
    case "set_all_clusters":
      return {
        ...state,
        clusters: action.payload
          .map(updateClusterOrdering)
          .map((c) => {
            return { ...c, active: false };
          })
          .sort((a, b) =>
            a.order < b.order ? -1 : a.order === b.order ? 0 : 1
          ),
      };
    case "reset_all_clusters":
      return {
        ...state,
        clusters: state.clusters.map((c) => {
          return { ...c, active: false };
        }),
      };
    case "set_cluster":
      return {
        ...state,
        clusters: state.clusters.map((cluster) => {
          if (cluster.value === action.payload.id) {
            return { ...cluster, active: action.payload.state };
          } else {
            return cluster;
          }
        }),
      };
    case "set_all_developments":
      return {
        ...state,
        developments: action.payload
          .sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0))
          .map((development) => {
            return { ...development, active: false };
          }),
      };
    case "set_development":
      return {
        ...state,
        developments: state.developments.map((development) => {
          if (development.value === action.payload.id) {
            return { ...development, active: action.payload.state };
          } else {
            return development;
          }
        }),
      };
    case "set_developments":
      return {
        ...state,
        developments: action.payload,
      };
    case "reset_development":
      return {
        ...state,
        developments: state.developments.map((development) => {
          return { ...development, active: false };
        }),
      };
    case "open_theme_filter":
      return {
        ...state,
        themeFilterOpen: true,
      };
    case "close_theme_filter":
      return {
        ...state,
        themeFilterOpen: false,
      };
    case "open_developments_overlay":
      return {
        ...state,
        developmentsOverlayOpen: true,
      };
    case "close_developments_overlay":
      return {
        ...state,
        developmentsOverlayOpen: false,
      };
    case "update_disposition_search":
      return {
        ...state,
        dispositionSearch: action.payload,
      };
    case "clear_disposition_search":
      return {
        ...state,
        dispositionSearch: "",
      };
    default:
      return state;
  }
};

const StateContext = createContext();
const DispatchContext = createContext();

const Reducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // initial global data load
  useEffect(() => {
    getFacets().then((r) => {
      r.facets.forEach((f) => {
        if (f.name === "Cluster") {
          dispatch({ type: "set_all_clusters", payload: f.values });
        } else if (f.name === "Ontwikkeling lange termijn") {
          dispatch({ type: "set_all_developments", payload: f.values });
        }
      });
    });

    getDispositionFacets().then((r) => {
      r.facets.forEach((f) => {
        if (f.name === "Gebied") {
          dispatch({ type: "set_all_areas", payload: f.values });
        }
      });
    });

    getThemes().then((payload) =>
      dispatch({ type: "set_global_themes", payload })
    );
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default Reducer;

export const useState = () => useContext(StateContext);
export const useDispatch = () => useContext(DispatchContext);

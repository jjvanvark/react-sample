import axios from "axios";

export const getAreas = async () => {
  return await axios
    .get(`${process.env.REACT_APP_HOST}/meta/Wbp6Gebied`)
    .then(({ data }) => data);
};

export const getFacets = async () => {
  return await axios
    .get(`${process.env.REACT_APP_HOST}/content/wbp6/facet/thema`)
    .then(({ data }) => {
      return data;
    });
};

export const getDispositionFacets = async (query = "", areas = []) => {
  return await axios
    .get(
      `${process.env.REACT_APP_HOST}/content/wbp6/facet/maatregel${
        areas.length > 0
          ? "?" + areas.map(({ id }) => "facet=" + id).join("&")
          : ""
      }${
        query.trim() !== ""
          ? (areas.length > 0 ? "&" : "?") + `text=${query}`
          : ""
      }`
    )
    .then(({ data }) => {
      return data;
    });
};

export const getDevelopments = async () => {
  return await axios
    .get(`${process.env.REACT_APP_HOST}/meta/Wbp6OntwikkelingLangeTermijn`)
    .then(({ data }) => data);
};

export const getThemes = async (
  filters = [],
  developments = [],
  cancelToken = null
) => {
  return await axios
    .get(
      `${process.env.REACT_APP_HOST}/content/wbp6/list/thema${
        filters.length === 0
          ? ""
          : "?" + filters.map(({ id }) => "facet=" + id).join("&")
      }${
        developments.length === 0
          ? ""
          : (filters.length === 0 ? "?" : "&") +
            developments.map(({ id }) => "facet=" + id).join("&")
      }`,
      { cancelToken }
    )
    .then(({ data }) => {
      return data;
    });
};

export const getTheme = async (id) => {
  return await axios
    .get(`${process.env.REACT_APP_HOST}/content/wbp6/${id}/thema`)
    .then(({ data }) => {
      return data;
    });
};

export const getDisposition = async (id) => {
  return await axios
    .get(`${process.env.REACT_APP_HOST}/content/wbp6/${id}/maatregel`)
    .then(({ data }) => data);
};

export const getDispositions = async (query = "", areas = [], page = 0) => {
  const trimmedQuery = query.trim();
  return await axios
    .get(
      `${process.env.REACT_APP_HOST}/content/wbp6/list/maatregel?limit=6&skip=${
        page * 6
      }${trimmedQuery === "" ? "" : `&text=${query}`}${
        areas.length === 0
          ? ""
          : "&" + areas.map(({ id }) => "facet=" + id).join("&")
      }`
    )
    .then(({ data }) => {
      return data;
    });
};

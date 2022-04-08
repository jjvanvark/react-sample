import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import DispositionCard from "../components/DispositionCard";
import AreaFilter from "../components/AreaFilter";
import SearchFilter from "../components/SearchFilter";
import { getDispositions, getDispositionFacets } from "../api";
import { useState as useGlobalState } from "../hooks/useReducer";
import DispositionPagination from "../components/DispositionPagination";
import LogoDelfsland from "../assets/logo-delfsland.svg";
import { useDispatch } from "../hooks/useReducer";

function getPageValue(value) {
  let queryParams = new URLSearchParams(value);
  const result = queryParams.has("page")
    ? isNaN(parseInt(queryParams.get("page")))
      ? 0
      : parseInt(queryParams.get("page"))
    : 0;
  return result;
}

function getMaxPages(count) {
  const rest = count % 6;
  return (count - rest) / 6 + (rest === 0 ? 0 : 1);
}

function DispositionIndex() {
  const [dispositions, setDispositions] = useState({
    count: 0,
    items: [],
  });
  const { dispositionSearch, areas } = useGlobalState();
  const { search, pathname } = useLocation();
  const [page, setPage] = useState(getPageValue(search));
  const [maxPages, setMaxPages] = useState(getMaxPages(0));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(getPageValue(search));
  }, [search]);

  useEffect(() => {
    return () => {
      dispatch({ type: "deactivate_all_filters" });
    };
  }, [pathname, dispatch]);

  useEffect(() => {
    const filteredAreas = areas.filter(({ active }) => active);
    Promise.all([
      getDispositions(dispositionSearch, filteredAreas, page),
      getDispositionFacets(dispositionSearch, filteredAreas),
    ])
      .then(([ds, facets]) => {
        setDispositions({ count: facets.count, items: ds });
        setMaxPages(getMaxPages(facets.count));
      })
      .catch((e) => console.log(e));
  }, [dispositionSearch, areas, page]);

  const handlePageLink = (page) => {
    navigate(`/maatregelen?page=${page}`);
    window.scrollTo({ top: 0, behaviour: "instant" });
  };

  return (
    <div className="DispositionIndex">
      <div className="DispositionIndex-header">
        <div className="container">
          <div className="row">
            <div className="col-1o2">
              <Link to="/">
                <img src={LogoDelfsland} alt="Delfsland" />
              </Link>
            </div>
            <div className="col-1o2 text-align-right">
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AreaFilter count={dispositions.length} />
      <div className="DispositionIndex-results">
        <div className="container">
          <div className="row">
            <div className="col-1o2 DispositionIndex__counter">
              <h2>{dispositions.count} gevonden resultaten</h2>
            </div>
            <SearchFilter />
          </div>
          <div className="row">
            {dispositions.items.map((disposition) => (
              <div
                className="col-1o1 col-l-1o2 col-xl-1o3"
                key={disposition.id}
              >
                <DispositionCard {...disposition} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-1 col-l-1o3 offset-l-1o3">
              <DispositionPagination
                current={page}
                maximum={maxPages}
                request={(newPage) => handlePageLink(newPage)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DispositionIndex;

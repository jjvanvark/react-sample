import React from "react";
import { useDispatch } from "../hooks/useReducer";
import { useNavigate } from "react-router-dom";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const SearchFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function processSearchFilter(e) {
    navigate("/maatregelen");
    dispatch({
      type: "update_disposition_search",
      payload: e.target.value.trim(),
    });
  }

  const handleSearchFilter = debounce((e) => processSearchFilter(e));

  return (
    <div className="col-1 col-l-1o2">
      <div className="Disposition-search search">
        <input
          type="text"
          name="search-filter"
          placeholder="Zoeken naar..."
          onInput={(e) => handleSearchFilter(e)}
        />
        <svg
          className="search--icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.84236 13.684C8.36049 13.6837 9.83487 13.1755 11.0307 12.2403L14.7906 16L16 14.7907L12.2401 11.031C13.1758 9.83508 13.6844 8.36043 13.6847 6.84199C13.6847 3.06949 10.6151 0 6.84236 0C3.06965 0 0 3.06949 0 6.84199C0 10.6145 3.06965 13.684 6.84236 13.684ZM6.84236 1.7105C9.67253 1.7105 11.9741 4.01197 11.9741 6.84199C11.9741 9.67201 9.67253 11.9735 6.84236 11.9735C4.01219 11.9735 1.71059 9.67201 1.71059 6.84199C1.71059 4.01197 4.01219 1.7105 6.84236 1.7105Z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchFilter;

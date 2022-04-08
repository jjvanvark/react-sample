const DevFilterItem = ({ label, active, value, callback }) => {
  return (
    <li className="theme-filter__cluster-list-item">
      <input
        type="checkbox"
        id={`cluster-filter-${value}`}
        checked={active}
        onChange={(e) => {
          callback(value, e.target.checked);
        }}
      />
      <label htmlFor={`cluster-filter-${value}`}>{label}</label>
    </li>
  );
};

export default DevFilterItem;

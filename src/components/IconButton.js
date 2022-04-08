const IconButton = ({
  children,
  className = "",
  glow = false,
  onClick = () => null,
}) => (
  <>
    <button
      onClick={onClick}
      className={`${className} icon-mobile-button ${
        glow ? "icon-mobile-button--shadow" : ""
      }`}
    >
      {children}
    </button>
  </>
);

export default IconButton;

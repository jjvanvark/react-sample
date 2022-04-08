export const colorByCluster = (cluster) => {
  switch (cluster) {
    case "overkoepelende thema’s":
      return "purple";
    case "waterveiligheid":
      return "red";
    case "organisatie & bestuur":
      return "yellow";
    case "waterkwaliteit":
      return "green";
    case "waterketen":
      return "brown";
    default:
      return "blue";
  }
};

import { Link } from "react-router-dom";

import { colorByCluster } from "../helpers/colorCluster";

const getImage = ({ link, variants }) => {
  const vars = variants.filter(({ width }) => width === 640);
  return vars.length > 0 ? vars[0].link : link;
};

function ClusterResult({ title, id, inhoud }) {
  const image = getImage(inhoud.hoofdafbeelding);
  const { cluster } = inhoud;

  return (
    <Link
      className={`ClusterIndex-result Result Result--${colorByCluster(
        cluster
      )}`}
      to={`/themas/${id}`}
    >
      <article>
        <div
          className="Result-image"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_HOST}${image})`,
          }}
        ></div>
        <div className="Result-body">
          <h3 className="Result-title">{title}</h3>
          <div className="Result-more">Lees meer</div>
          <section className="Result-cluster">
            <h4>Cluster:</h4>
            <div>{cluster}</div>
          </section>
        </div>
      </article>
    </Link>
  );
}

export default ClusterResult;

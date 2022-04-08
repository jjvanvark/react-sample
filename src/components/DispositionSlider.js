import { useState, useEffect } from "react";
import { getDisposition } from "../api";
import DispositionCard from "./DispositionCard";
import Slider from "./Slider";

const DispositionSlide = ({ id, color }) => {
  const [disposition, setDisposition] = useState(null);

  useEffect(() => {
    getDisposition(id).then(setDisposition);
  }, [id]);

  return (
    <>
      {disposition !== null && (
        <DispositionCard {...disposition} color={color} hideTheme={true} />
      )}
    </>
  );
};

const DispositionSlider = ({ dispositionIds = [], color = "blue" }) => {
  return (
    <div className={`disposition-slider disposition-slider--${color}`}>
      <div className="container">
        <div className="row">
          <div className="col-1 col-l-1o3">
            <div className="ClusterDetail-title block block--xdark block--type1">
              <h2>Wat zijn de maatregelen?</h2>
            </div>
          </div>
        </div>
      </div>
      <Slider color={color}>
        {dispositionIds.map((id, index) => (
          <DispositionSlide id={id} key={index} color={color} />
        ))}
      </Slider>
    </div>
  );
};

export default DispositionSlider;

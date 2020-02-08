import React, { useState, useEffect } from "react";
import LocationItem from "../../molecules/locationitem";
import style from "./index.module.scss";

const Locationpicker = ({ data, onClick }) => {
  const [totalCamera, setTotalCamera] = useState(0);

  useEffect(() => {
    let total = 0;
    for (const route in data) {
      total += data[route].length;
    }
    setTotalCamera(total);
  }, [data]);

  return (
    <div className="card my-4">
      <div className={`card-header text-center ${style.header}`}>
        <i className="fas fa-map-marker-alt" /> Traffic Camera ({totalCamera})
      </div>
      <ul className={`list-group list-group-flush ${style.maxHeight}`}>
        {data
          ? Object.keys(data)
              .sort()
              .map((key, index) => {
                return (
                  <LocationItem
                    count={data[key].length}
                    onClick={onClick}
                    key={index + key}
                    index={index}
                    imageUrl={data[key][0].image}
                    name={key}
                  />
                );
              })
          : null}
      </ul>
    </div>
  );
};

export default Locationpicker;

Locationpicker.defaultProps = {
  data: "",
  onClick: ""
};

import React from "react";
import Img from "react-image";

import ImagePlaceholder from "../../atoms/imageplaceholder";

const LocationItem = ({ imageUrl, name, onClick, index, count }) => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-auto">
          <div
            className="clickable"
            onClick={() => {
              onClick(name);
            }}
          >
            <Img
              src={imageUrl}
              alt={name}
              className="rounded-lg"
              style={{ height: "64px", width: "64px" }}
              loader={<ImagePlaceholder width="64px" height="64px" />}
              unloader={<ImagePlaceholder width="64px" height="64px" />}
            />
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <h5
                className="clickable"
                onClick={() => {
                  onClick(name);
                }}
              >
                {name} ({count})
              </h5>
            </div>
            <div className="col-auto">
              <div className="d-none d-sm-block">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onClick(name);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LocationItem;

LocationItem.defaultProps = {
  key: "",
  imageUrl: "",
  name: "",
  onClick: () => {}
};

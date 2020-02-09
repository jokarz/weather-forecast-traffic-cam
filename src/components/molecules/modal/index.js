import React, { useEffect, useState, useRef } from "react";
import Img from "react-image";

import ImagePlaceholder from "../../atoms/imageplaceholder";
import style from "./index.module.scss";

const ThumbnailPH = () => <ImagePlaceholder width="64px" height="64px" />;
const SelectedPH = () => (
  <ImagePlaceholder
    width="100%"
    height="320px"
    className="rounded-lg figure-img"
  />
);

const Modal = ({ show, setShow, title, data }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalRef = useRef(null);
  useEffect(() => {
    if (!show) {
      setSelectedImageIndex(0);
      document.documentElement.style.overflow = "auto";
    } else {
      document.documentElement.style.overflow = "hidden";
      modalRef.current.focus();
    }
  }, [show]);

  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: show ? "block" : "none" }}
      onKeyDown={e => {
        if (e.keyCode === 27) {
          setShow(null);
        }
      }}
      ref={modalRef}
    >
      <div className={`${style.backDrop}`} onClick={() => setShow(null)} />
      <div className="modal-dialog my-4">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              onClick={() => setShow(null)}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col">
                {data ? (
                  <figure className="figure w-100">
                    <Img
                      src={data[selectedImageIndex].image}
                      alt={title}
                      className="figure-img img-fluid rounded-lg"
                      style={{ height: "320px", width: "100%" }}
                      loader={<SelectedPH />}
                      unloader={<SelectedPH />}
                    />
                    <figcaption className="text-dark">
                      {data[selectedImageIndex].forecast ? (
                        <>
                          {data[selectedImageIndex].area} area, weather
                          forecasted to be{" "}
                          <b>
                            {data[selectedImageIndex].forecast.toLowerCase()}
                          </b>
                        </>
                      ) : (
                        ""
                      )}
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="mb-3">
                  Click below to view the different traffic camera for the route
                </h6>
                <ul className="list-inline">
                  {data
                    ? data.map((item, index) => {
                        return (
                          <li
                            className="list-inline-item mb-2 mr-2"
                            key={item.image}
                          >
                            <div
                              className={`p-1 rounded-lg clickable ${
                                index === selectedImageIndex
                                  ? style.selectedImage
                                  : style.unselectedImage
                              }`}
                            >
                              <Img
                                onClick={() => setSelectedImageIndex(index)}
                                src={item.image}
                                alt={`title-${index}`}
                                className="rounded-lg"
                                style={{ height: "64px", width: "64px" }}
                                loader={<ThumbnailPH />}
                                unloader={<ThumbnailPH />}
                              />
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShow(null)}
            >
              <i className="fas fa-chevron-left"></i>
              {` Back`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.defaultProps = {
  show: true,
  setShow: () => {},
  title: "",
  data: null
};

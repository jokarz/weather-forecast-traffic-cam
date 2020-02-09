import React, { useState, useRef, useEffect } from "react";

import Datepicker from "../../molecules/datepicker";
import Timepicker from "../../molecules/timepicker";

import useResize from "../../../util/resizeHook";

import "../organisms.scss";

const Datetime = ({ date, setDate, time, setTime, loading, invalid }) => {
  const [ownHeight, setOwnHeight] = useState(0);
  const [top, setTop] = useState(0);

  const size = useResize();

  const waitingPhrases = [
    "Processing...",
    "Just a moment...",
    "Retrieving...",
    "Fetching...",
    "Updating..."
  ];

  const persist = useRef(
    waitingPhrases[Math.floor(Math.random() * waitingPhrases.length)]
  );
  const ele = useRef(0);

  useEffect(() => {
    setOwnHeight(ele.current.clientHeight);
  }, []);

  useEffect(() => {
    if (!date || !time || loading || (date && time && invalid)) {
      const newTop = (size.height - 130 - ownHeight) * 0.4;
      setTop(newTop);
    } else {
      setTop(0);
    }
  }, [date, time, loading, invalid, size, ownHeight]);

  return (
    <div
      className="col-auto"
      style={{
        marginTop: top,
        transition: "margin 0.3 ease"
      }}
      ref={ele}
    >
      {!loading ? (
        <>
          {date && time && !invalid ? null : (
            <h3 className="text-center mb-3">To start:</h3>
          )}
          <h4 className="text-center date-time">
            <Datepicker date={date} setDate={setDate} />
            <span>{` ${date && time ? "at" : "&"} `}</span>
            <Timepicker time={time} setTime={setTime} />
          </h4>
        </>
      ) : (
        <h4 className="text-center">
          <i className="fas fa-spinner fa-pulse"></i>
          {` ${persist.current}`}
        </h4>
      )}
    </div>
  );
};

export default Datetime;

Datetime.defaultProps = {
  date: null,
  setDate: () => {},
  time: null,
  setTime: () => {},
  loading: false,
  invalid: false
};

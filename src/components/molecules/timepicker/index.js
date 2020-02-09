import React, { forwardRef } from "react";
import Dp from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useResize from "../../../util/resizeHook";
import "../molecules.scss";

const TimepickerBtn = forwardRef(({ value, onClick, bigger }, ref) => (
  <button
    className={`btn btn-primary ${bigger ? "btn-lg" : ""}`}
    onClick={onClick}
    ref={ref}
  >
    <i className="fas fa-clock" /> {value || "Select time"}
  </button>
));

const Timepicker = ({ time, setTime }) => {
  const ref = React.createRef();
  const size = useResize();
  return (
    <Dp
      showPopperArrow={false}
      selected={time}
      withPortal={size.width <= 576}
      onChange={time => setTime(time || null)}
      timeIntervals={5}
      showTimeSelect
      showTimeSelectOnly
      dateFormat="h:mm aa"
      customInput={<TimepickerBtn ref={ref} bigger={size.width > 576} />}
    />
  );
};

export default Timepicker;

Timepicker.defaultProps = {
  time: null,
  setTime: () => {}
};

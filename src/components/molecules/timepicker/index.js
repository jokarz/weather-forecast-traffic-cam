import React, { forwardRef } from 'react'
import Dp from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import useResize from '../../../util/resizeHook'
import '../molecules.scss'

const TimepickerBtn = forwardRef(({ value, onClick }, ref) => (
  <button className="btn btn-primary" onClick={onClick} ref={ref}>
    <i className="fas fa-clock"></i> {' '}
    {value || `Select a time`}
  </button>
))

const Timepicker = ({ time, setTime }) => {
  const ref = React.createRef()
  const size = useResize()
  return (
    < Dp
      showPopperArrow={false}
      selected={time}
      withPortal={size.width <= 576}
      onChange={time => setTime(time)}
      showTimeSelect
      showTimeSelectOnly
      dateFormat="h:mm aa"
      customInput={<TimepickerBtn ref={ref} />}
    />
  )
}


export default Timepicker


Timepicker.defaultProps = {
  time: null,
  setTime: () => { }
}

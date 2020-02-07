import React, { forwardRef } from 'react'
import Dp from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import useResize from '../../../util/resizeHook'
import '../molecules.scss'

const DatepickerBtn = forwardRef(({ value, onClick }, ref) => (
  <button className="btn btn-primary" onClick={onClick} ref={ref}>
    <i className="fas fa-calendar-day"></i> {' '}
    {value || `Select a date`}
  </button>
))

const Datepicker = ({ date, setDate }) => {
  const ref = React.createRef()
  const size = useResize()
  return (
    < Dp
      selected={date}
      withPortal={size.width <= 576}
      showPopperArrow={false}
      disabledKeyboardNavigation
      onChange={date => setDate(date)}
      customInput={< DatepickerBtn ref={ref} />}
    />
  )
}


export default Datepicker


Datepicker.defaultProps = {
  date: null,
  setDate: () => { }
}

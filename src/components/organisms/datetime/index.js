import React from 'react'

import Datepicker from '../../molecules/datepicker'
import Timepicker from '../../molecules/timepicker'

import useResize from '../../../util/resizeHook'

import '../organisms.scss'

const Datetime = ({ date, setDate, time, setTime, loading }) => {
  const size = useResize()

  return (
    <div className="col-auto" style={{
      marginTop: date && time ? 0 : size.height * 0.25,
      transition: 'margin 0.3 ease'
    }}>
      {
        !loading ?
          <>
            {
              date && time ?
                null :
                <h4 className="text-center pb-3">To start:</h4>
            }
            <h4 className="text-center date-time">
              < Datepicker date={date} setDate={setDate} />
              <span>{` & `}</span>
              < Timepicker time={time} setTime={setTime} />
            </h4>
          </>
          :
          <h4 className="text-center">Processing...</h4>
      }
    </div>
  )
}

export default Datetime

Datetime.defaultProps = {
  date: null,
  setDate: () => { },
  time: null,
  setTime: () => { },
  loading: false
}
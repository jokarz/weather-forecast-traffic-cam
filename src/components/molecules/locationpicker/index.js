import React from 'react'
import LocationItem from '../../atoms/locationitem'
import style from './index.module.scss'

const Locationpicker = ({ data, onClick }) => {
  console.log('data in location', data)
  return (
    <div className="card mt-4">
      <div className={`card-header text-center ${style.header} ${style.maxHeight}`}>
        <i className="fas fa-map-marker-alt"></i> Locations available ({data ? data.length : 0})
        </div>
      <ul className="list-group list-group-flush">
        {
          data.map((item, index) => {
            return (
              <LocationItem
                onClick={onClick}
                key={item.camera_id+item.name}
                index={index}
                imageUrl={item.image}
                name={'' + item.location.latitude + item.location.longitude}
                {...item}
              />
            )
          })
        }
      </ul>
    </div>
  )
}

export default Locationpicker
import React from 'react'

const LocationItem = ({ imageUrl, name, onClick, index}) => {

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-auto">
          <img
            src={imageUrl}
            alt={name}
            className="rounded-lg"
            style={{ height: '64px', width: '64px' }} />
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <span>{name}</span>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={() => {onClick(index)}}>View</button>
            </div>
          </div>
        </div>

      </div>
    </li>
  )
}


export default LocationItem

LocationItem.defaultProps = {
  key: '',
  imageUrl: '',
  name: '',
  onClick: () => { }
}
import React from 'react';

const TouristSpotList = ({ spots, onAddToItinerary }) => {
  return (
    <div>
      <h2 className="h5">観光地リスト</h2>
      <div className="list-group">
        {spots.map(spot => (
          <div key={spot.id} className="card mb-3">
            <img src={spot.image} className="card-img-top" alt={spot.name} />
            <div className="card-body">
              <h5 className="card-title">{spot.name}</h5>
              <p className="card-text">{spot.description}</p>
              <button
                onClick={() => onAddToItinerary(spot)}
                className="btn btn-primary"
              >
                旅程に追加
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristSpotList;
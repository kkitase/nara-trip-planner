import React from 'react';

const Itinerary = ({ startPoint, itinerary, onMoveSpot, onSaveItinerary, onClearItinerary }) => {
  return (
    <div className="mb-4">
      <h2 className="h5">旅程</h2>
      <ul className="list-group">
        {startPoint && (
          <li className="list-group-item list-group-item-info">
            <strong>出発点:</strong> 地図上の選択地点
          </li>
        )}
        {itinerary.length > 0 ? (
          itinerary.map((spot, index) => (
            <li key={spot.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{index + 1}. {spot.name}</span>
              <div>
                <button
                  onClick={() => onMoveSpot(index, 'up')}
                  disabled={index === 0}
                  className="btn btn-sm btn-light me-1"
                  aria-label="上へ"
                >
                  ▲
                </button>
                <button
                  onClick={() => onMoveSpot(index, 'down')}
                  disabled={index === itinerary.length - 1}
                  className="btn btn-sm btn-light"
                  aria-label="下へ"
                >
                  ▼
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">観光地が追加されていません</li>
        )}
      </ul>
      {itinerary.length > 0 && (
        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={onSaveItinerary}>
            旅程を保存
          </button>
          <button className="btn btn-danger" onClick={onClearItinerary}>
            旅程をクリア
          </button>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
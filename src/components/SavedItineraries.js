import React from 'react';

const SavedItineraries = ({ savedItineraries, onLoadItinerary, onDeleteItinerary }) => {
  return (
    <div className="mt-4">
      <h2 className="h5">保存した旅程</h2>
      {Object.keys(savedItineraries).length > 0 ? (
        <ul className="list-group">
          {Object.entries(savedItineraries).map(([name, itineraryData]) => (
            <li key={name} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{name}</span>
              <div>
                <button className="btn btn-sm btn-success me-2" onClick={() => onLoadItinerary(name)}>
                  呼び出す
                </button>
                <button className="btn btn-sm btn-warning" onClick={() => onDeleteItinerary(name)}>
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>保存された旅程はありません。</p>
      )}
    </div>
  );
};

export default SavedItineraries;

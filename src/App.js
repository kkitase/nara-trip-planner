import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import TouristSpotList from './components/TouristSpotList';
import Itinerary from './components/Itinerary';
import spots from './touristSpots.json';

function App() {
  const [itinerary, setItinerary] = useState([]);
  const [startPoint, setStartPoint] = useState(null);

  const addToItinerary = (spot) => {
    if (!itinerary.find(s => s.id === spot.id)) {
      setItinerary([...itinerary, spot]);
    }
  };

  const moveSpot = (index, direction) => {
    const newItinerary = [...itinerary];
    const [movedSpot] = newItinerary.splice(index, 1);
    if (direction === 'up') {
      newItinerary.splice(index - 1, 0, movedSpot);
    } else {
      newItinerary.splice(index + 1, 0, movedSpot);
    }
    setItinerary(newItinerary);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1 className="h4 mb-4">奈良 観光プランナー</h1>
        <Itinerary
          startPoint={startPoint}
          itinerary={itinerary}
          onMoveSpot={moveSpot}
        />
        <hr className="my-4" />
        <TouristSpotList
          spots={spots}
          onAddToItinerary={addToItinerary}
        />
      </div>
      <div className="map-container">
        <Map
          spots={spots}
          itinerary={itinerary}
          startPoint={startPoint}
          onSetStartPoint={setStartPoint}
        />
      </div>
    </div>
  );
}

export default App;

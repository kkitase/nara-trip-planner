import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import TouristSpotList from './components/TouristSpotList';
import Itinerary from './components/Itinerary';
import spots from './touristSpots.json';

const STORAGE_KEY = 'nara-trip-planner-data';

function App() {
  const [itinerary, setItinerary] = useState([]);
  const [startPoint, setStartPoint] = useState(null);

  // Load itinerary from local storage on initial render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const { itinerary: savedItinerary, startPoint: savedStartPoint } = JSON.parse(savedData);
        if (savedItinerary) {
          setItinerary(savedItinerary);
        }
        if (savedStartPoint) {
          setStartPoint(savedStartPoint);
        }
      }
    } catch (error) {
      console.error("Failed to load itinerary from local storage", error);
    }
  }, []);

  const handleSaveItinerary = () => {
    try {
      const dataToSave = {
        itinerary: itinerary,
        startPoint: startPoint,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      alert('旅程を保存しました。');
    } catch (error) {
      console.error("Failed to save itinerary to local storage", error);
      alert('旅程の保存に失敗しました。');
    }
  };

  const handleClearItinerary = () => {
    if (window.confirm('本当に旅程をクリアしますか？保存したデータも削除されます。')) {
      try {
        setItinerary([]);
        setStartPoint(null);
        localStorage.removeItem(STORAGE_KEY);
        alert('旅程をクリアしました。');
      } catch (error) {
        console.error("Failed to clear itinerary from local storage", error);
        alert('旅程のクリアに失敗しました。');
      }
    }
  };

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
          onSaveItinerary={handleSaveItinerary}
          onClearItinerary={handleClearItinerary}
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

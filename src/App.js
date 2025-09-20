import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import TouristSpotList from './components/TouristSpotList';
import Itinerary from './components/Itinerary';
import SavedItineraries from './components/SavedItineraries';
import spots from './touristSpots.json';

const STORAGE_KEY = 'nara-trip-planner-data';

function App() {
  const [itinerary, setItinerary] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [savedItineraries, setSavedItineraries] = useState({});
  const [currentPlanName, setCurrentPlanName] = useState(null);

  // Load saved itineraries from local storage on initial render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setSavedItineraries(parsedData);
      }
    } catch (error) {
      console.error("Failed to load itineraries from local storage", error);
    }
  }, []);

  const handleSaveItinerary = () => {
    const planName = prompt('旅程の名前を入力してください:', currentPlanName || '');
    if (planName) {
      try {
        const newSavedItineraries = {
          ...savedItineraries,
          [planName]: {
            itinerary: itinerary,
            startPoint: startPoint,
          },
        };
        setSavedItineraries(newSavedItineraries);
        setCurrentPlanName(planName);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedItineraries));
        alert(`「${planName}」という名前で旅程を保存しました。`);
      } catch (error) {
        console.error("Failed to save itinerary to local storage", error);
        alert('旅程の保存に失敗しました。');
      }
    }
  };

  const handleLoadItinerary = (planName) => {
    if (savedItineraries[planName]) {
      const { itinerary: loadedItinerary, startPoint: loadedStartPoint } = savedItineraries[planName];
      setItinerary(loadedItinerary);
      setStartPoint(loadedStartPoint);
      setCurrentPlanName(planName);
      alert(`「${planName}」を読み込みました。`);
    }
  };

  const handleDeleteItinerary = (planName) => {
    if (window.confirm(`本当に「${planName}」を削除しますか？`)) {
      try {
        const newSavedItineraries = { ...savedItineraries };
        delete newSavedItineraries[planName];
        setSavedItineraries(newSavedItineraries);
        if (currentPlanName === planName) {
          setCurrentPlanName(null);
          setItinerary([]);
          setStartPoint(null);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedItineraries));
        alert(`「${planName}」を削除しました。`);
      } catch (error) {
        console.error("Failed to delete itinerary from local storage", error);
        alert('旅程の削除に失敗しました。');
      }
    }
  };

  const handleClearItinerary = () => {
    if (window.confirm('現在の旅程をクリアしますか？(保存した旅程は削除されません)')) {
      setItinerary([]);
      setStartPoint(null);
      setCurrentPlanName(null);
      alert('旅程をクリアしました。');
    }
  };

  const handleOptimizeItinerary = () => {
    if (!startPoint || itinerary.length < 2) {
      alert('出発点と、2つ以上の観光地を選択してください。');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const origin = startPoint;
    const destination = startPoint; // Start and end at the same point
    const waypoints = itinerary.map(spot => ({
      location: { lat: spot.lat, lng: spot.lng },
      stopover: true
    }));

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const optimizedOrder = result.routes[0].waypoint_order;
          const optimizedItinerary = optimizedOrder.map(index => itinerary[index]);
          setItinerary(optimizedItinerary);
          setCurrentPlanName(null); // The plan is now different from any saved plan
          alert('ルートを最適化しました。');
        } else {
          console.error(`error fetching directions ${result}`);
          alert('ルートの最適化に失敗しました。');
        }
      }
    );
  };

  const addToItinerary = (spot) => {
    if (!itinerary.find(s => s.id === spot.id)) {
      setItinerary([...itinerary, spot]);
      setCurrentPlanName(null);
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
    setCurrentPlanName(null);
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
          onOptimizeItinerary={handleOptimizeItinerary}
          currentPlanName={currentPlanName}
        />
        <SavedItineraries
          savedItineraries={savedItineraries}
          onLoadItinerary={handleLoadItinerary}
          onDeleteItinerary={handleDeleteItinerary}
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

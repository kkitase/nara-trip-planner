import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 34.6851,
  lng: 135.8441
};

const Map = ({ spots, itinerary, startPoint, onSetStartPoint }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';

  if (apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          <p>Google Maps API キーが設定されていません。</p>
          <p><code>.env</code> ファイルを作成し、<code>REACT_APP_GOOGLE_MAPS_API_KEY='あなたのAPIキー'</code> を設定してください。</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onClick={(e) => onSetStartPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
      >
        {spots.map(spot => (
          <Marker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            label={spot.id.toString()}
          />
        ))}

        {startPoint && (
          <Marker
            position={startPoint}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
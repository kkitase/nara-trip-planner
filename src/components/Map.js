import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// 地図コンポーネントのスタイル定義
const containerStyle = {
  width: '100%',
  height: '100%'
};

// 地図の初期中心座標（奈良公園付近）
const center = {
  lat: 34.6851,
  lng: 135.8441
};

/**
 * 地図表示とルート計算を担当するコンポーネント
 * @param {object} props - spots, itinerary, startPoint, onSetStartPoint を含むプロパティ
 */
const Map = ({ spots, itinerary, startPoint, onSetStartPoint }) => {
  // 環境変数からAPIキーを取得、なければプレースホルダーを使用
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
  // ルート検索結果を保持するstate
  const [directions, setDirections] = useState(null);

  // itineraryかstartPointが変更された時にルート検索を実行するeffect
  useEffect(() => {
    // Google Maps APIがロードされていない、または出発点か旅程が空の場合はルートをクリアして終了
    if (!window.google || !startPoint || itinerary.length === 0) {
      setDirections(null);
      return;
    }

    // DirectionsServiceのインスタンスを作成
    const directionsService = new window.google.maps.DirectionsService();

    // ルート検索のリクエストを構築
    const origin = startPoint; // 出発点
    const destination = itinerary[itinerary.length - 1]; // 旅程の最後の地点を目的地に設定
    // 旅程の途中地点を経由地として設定
    const waypoints = itinerary.slice(0, -1).map(spot => ({
      location: { lat: spot.lat, lng: spot.lng },
      stopover: true
    }));

    // ルート検索を実行
    directionsService.route(
      {
        origin: origin,
        destination: { lat: destination.lat, lng: destination.lng },
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING // 移動手段は自動車
      },
      (result, status) => {
        // 検索成功時はdirections stateを更新
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          // 失敗時はエラーをコンソールに出力
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [itinerary, startPoint]); // 依存配列: itineraryかstartPointの変更を監視


  // APIキーが設定されていない場合にメッセージを表示
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

  // 地図を描画
  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={['places', 'directions']} // 使用するライブラリを指定
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onClick={(e) => onSetStartPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() })} // 地図クリックで出発点を設定
      >
        {/* ルート計算前: 出発点と全観光地のマーカーを表示 */}
        {!directions && startPoint && (
            <Marker
              position={startPoint}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // 青いマーカー
              }}
            />
        )}
        
        {!directions && spots.map(spot => (
          <Marker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            label={spot.id.toString()}
          />
        ))}

        {/* ルート計算後: DirectionsRendererでルートとマーカーを描画 */}
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
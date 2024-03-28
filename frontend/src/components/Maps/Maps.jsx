import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px',
};

const customMarker = {
  path: "M13.0167 35C12.7836 35 12.7171 34.9346 12.3176 33.725C11.9848 32.6789 11.4854 31.0769 10.1873 29.1154C8.92233 27.1866 7.59085 25.6173 6.32594 24.1135C3.36339 20.5174 1 17.7057 1 12.6385C1.03329 6.19808 6.39251 1 13.0167 1C19.6408 1 25 6.23078 25 12.6385C25 17.7057 22.6699 20.55 19.6741 24.1462C18.4425 25.65 17.1443 27.2193 15.8793 29.1154C14.6144 31.0442 14.0818 32.6135 13.749 33.6596C13.3495 34.9346 13.2497 35 13.0167 35Z M13 18C15.7614 18 18 15.7614 18 13C18 10.2386 15.7614 8 13 8C10.2386 8 8 10.2386 8 13C8 15.7614 10.2386 18 13 18Z",
  fillColor: "red",
  fillOpacity: 2,
  strokeWeight: 1,
  rotation: 0,
  scale: 1,
};

const center = {
  lat: 47.6061,
  lng: 122.3328,
};

const Maps = ({ apiKey, location }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location || center}
          zoom={10}
        >
          <Marker
            position={location}
            label={{text: "I'm Here!", color: "white", className: "google-map-marker" }}
            icon={customMarker}
          />
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px',
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
        />
      )}
    </>
  );
};

export default React.memo(Maps);

import React, { useState } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const MapContainer = props => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const bounds = new props.google.maps.LatLngBounds();

  props.pollingPlaces.forEach(place => bounds.extend({ lat: place.lat, lng: place.lon }));

  console.log(bounds);
  console.log(bounds.getCenter());

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setSelectedPlace(null);
  };

  return (
    <Map google={props.google} initialCenter={{ lat: 40.08851475, lng: -105.29907474999999 }} onClick={onInfoWindowClose} zoom={10}>

      {props.pollingPlaces.map(place => <Marker onClick={onMarkerClick} key={place.Poll} title={place.Poll} position={{lat: place.lat, lng: place.lon }} />)}

      <InfoWindow marker={activeMarker} onClose={onInfoWindowClose} visible={!!activeMarker}>
        <div>
          <h1>{selectedPlace?.title}</h1>
        </div>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyC64xO8ISsObcUA4GsVH0R7LW-neOGPo2k')
})(MapContainer)

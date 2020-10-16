import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { buildDirectionsUrl } from '../util/googleMaps';
import { makeStyles } from '@material-ui/core/styles';
import openInNew from '../assets/openInNew.png'

/*
https://stackoverflow.com/a/61235320
 */
const InfoWindowEx = (props) => {
  const infoWindowRef = React.createRef();
  const contentElement = document.createElement(`div`);
  useEffect(() => {
    ReactDOM.render(React.Children.only(props.children), contentElement);
    infoWindowRef.current.infowindow.setContent(contentElement);
  }, [props.children]);
  return <InfoWindow ref={infoWindowRef} {...props} />;
};

const useStyles = makeStyles(() => ({
  address: {
    alignItems: 'center',
    display: 'flex',
    paddingTop: 4,
    '& img': {
      height: 14,
      paddingLeft: 4,
      width: 14,
    },
  },
  info: {
    fontSize: 14,
    '& h4': {
      margin: 0,
      paddingBottom: 4,
    },
  },
}));

const MapView = ({ google, pollingPlaces }) => {
  const classes = useStyles();

  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // TODO: make bounds work instead of hardcoding initialCenter
  // const bounds = new google.maps.LatLngBounds();
  // pollingPlaces.forEach(place => bounds.extend({ lat: place.lat, lng: place.lon }));
  // console.log(bounds.getCenter());

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setSelectedPlace(null);
  };

  const openInGoogleMaps = address => window.open(buildDirectionsUrl(address), '_blank');

  return (
    <Map
      fullscreenControl={false}
      google={google}
      initialCenter={{ lat: 40.08851475, lng: -105.29907474999999 }}
      mapTypeControl={false}
      streetViewControl={false}
      onClick={onInfoWindowClose}
      zoom={10}
    >
      {pollingPlaces.map(place =>
        <Marker
          address={place.address}
          key={place.polling_station}
          onClick={onMarkerClick}
          position={{ lat: place.lat, lng: place.lon }}
          title={place.polling_station}
          wait={place.minutes_wait}
        />
      )}

      <InfoWindowEx marker={activeMarker} onClose={onInfoWindowClose} visible={!!activeMarker}>
        <div className={classes.info}>
          <h4>{selectedPlace?.title}</h4>
          Wait Time: {selectedPlace?.wait}
          <div className={classes.address} onClick={() => openInGoogleMaps(selectedPlace?.address)}>
            Get directions <img src={openInNew} />
          </div>
        </div>
      </InfoWindowEx>
    </Map>
  );
};

export default GoogleApiWrapper({ apiKey: ('AIzaSyC64xO8ISsObcUA4GsVH0R7LW-neOGPo2k') })(MapView);

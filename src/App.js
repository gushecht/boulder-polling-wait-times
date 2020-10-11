import React, { useEffect } from 'react';
import './App.css';
import data from './data';
import MapContainer from './Map';

function App() {
  // useEffect(() => {
  //   fetch('https://app.redash.io/boulder-county/api/queries/485071/results.json?api_key=UspwLVrgappzWF9m92FMKi3qDM73pPNynKCtMs6S')
  //     .then(res => res.json())
  //     .then(console.log)
  // }, []);

  console.log(data);
  return (
    <div className="App">
      <MapContainer pollingPlaces={data.query_result.data.rows} />
    </div>
  );
}

export default App;

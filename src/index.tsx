import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZWRkcm9zYWxlcyIsImEiOiJja3ltOHdqdWMwMDNvMm5xeDZ2MGJqMmhpIn0.8boKA-VFGpDzwZNDWbIjkw';

if ( !navigator.geolocation ) {
  alert( 'Tú navegador no tiene opción de Geolocation activa' );
  throw new Error('Tú navegador no tiene opción de Geolocation activa');
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

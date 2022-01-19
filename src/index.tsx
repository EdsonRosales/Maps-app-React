import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';

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

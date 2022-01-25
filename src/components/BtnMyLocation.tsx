import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";


export const BtnMyLocation = () => {

    const { map, isMapReady } = useContext( MapContext );
    const { userLocation } = useContext( PlacesContext );

    //This is how can return to the user location with a button
    const onClick = () => {
        if ( !isMapReady ) throw new Error('El Mapa aún no está listo');
        if ( !userLocation ) throw new Error('No hay ubicación de usuario');

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }

    return (
        <button
            className="btn btn-primary"
            onClick={ onClick }
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            Mi Ubicación          
        </button>
    );
};

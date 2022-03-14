import { useContext, useEffect, useReducer } from "react";
import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer( mapReducer, INITIAL_STATE );
    const { places } = useContext( PlacesContext )

    //This useEffect is watching to the changes in places
    useEffect(() => {
        //For delete the markers in map
        state.markers.forEach( marker => marker.remove() );
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popUp = new Popup()
                .setHTML(`
                    <h6>${ place.text_es }</h6>
                    <p>${ place.place_name_es }</p>
                `);
            const newMarker = new Marker()
                .setPopup( popUp )
                .setLngLat([ lng, lat ])
                .addTo( state.map! );
            newMarkers.push( newMarker );
        }

        // Todo: limpiar polylines
        dispatch({ type: 'setMarkers', payload: newMarkers });

    }, [ places ])
    

    const setMap = ( map: Map ) => {

        //Location Pop-up
        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Aquí estoy!!</h4>
                <p>Somewhere in the world</p>
            `)

        //Adding the marker to the map
        new Marker({
            color: '#5d3dcf'
        })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo( map );

        dispatch({ type: 'setMap', payload: map })
    }

    const getRouteBetweenPoints = async( start: [number, number], end: [number, number] ) => {

        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
        const { distance, duration, geometry } = resp.data.routes[0];

        //Convert the distance in Kilometers
        let km = distance / 1000;
            km = Math.round( km * 100 );
            km /= 100;
        
        const minutes = Math.floor( duration / 60 );
        console.log({ km, minutes });
    }

    return (
        <MapContext.Provider value={{
            ...state,

            //Methods
            setMap,
            getRouteBetweenPoints,
        }}>
            { children }
        </MapContext.Provider>
    )
};

import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers/index"
import { searchApi } from "../../apis";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [ number, number ],
}

//This is how looks my state for now...
const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
    
    //Here's where I obtain the geolocation of the user with my helper getUserLocationS
    useEffect(() => {
        getUserLocation()
            .then( lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
    }, []);

    //This function helps me to dispatch a searching query to the API of places in Mapbox
    const searchPlacesByTerm = async( query: string ) => {
        if (query.length === 0) return []; //Todo: Clean state
        if( !state.userLocation ) throw new Error('No hay ubicación del usuario');

        const resp = await searchApi.get(`/${ query }.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        console.log(resp.data);

        return resp.data;
    }
    

    return (
        <PlacesContext.Provider value={{
            ...state,

            //Methods
            searchPlacesByTerm
        }}>
            { children }
        </PlacesContext.Provider>
    )
};

import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers/index"

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
    

    return (
        <PlacesContext.Provider value={{
            ...state,
        }}>
            { children }
        </PlacesContext.Provider>
    )
};

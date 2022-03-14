import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers/index"
import { searchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [ number, number ];
    isLoadingPlaces: boolean;
    places: Feature[];
}

//This is how looks my state for now...
const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
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
    const searchPlacesByTerm = async( query: string ): Promise<Feature[]> => {
        //Cleaning the state
        if (query.length === 0) {
            dispatch({ type: 'setPlaces', payload: [] })
            return [];
        }
        if( !state.userLocation ) throw new Error('No hay ubicación del usuario');

        dispatch({ type: 'setLoadingPlaces' });

        //After the first dispatch, in this moment I start to load the Http request data

        const resp = await searchApi.get<PlacesResponse>(`/${ query }.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        //When the resp ends, I need to load mi response in other action with my second dispatch
        dispatch({ type: 'setPlaces', payload: resp.data.features });
        return resp.data.features;
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

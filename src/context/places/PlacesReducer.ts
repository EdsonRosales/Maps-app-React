import { PlacesState } from './PlacesProvider'
import { Feature } from '../../interfaces/places';

type PlacesAction = 
| { type: 'setUserLocation', payload: [number, number] }
| { type: 'setLoadingPlaces' }
| { type: 'setPlaces', payload: Feature[] }

//A reducer always must return something of type PlacesState
export const placesReducer = ( state: PlacesState, action: PlacesAction ): PlacesState => {
    
    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: true,
                places: [], //<-- To clean my old data in my places, 'cause I want to search new places
            }
        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }
        default:
            return state;
    }
}
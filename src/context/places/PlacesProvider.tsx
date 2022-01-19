import { useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";

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
    

    return (
        <PlacesContext.Provider value={{
            ...state,
        }}>
            { children }
        </PlacesContext.Provider>
    )
};

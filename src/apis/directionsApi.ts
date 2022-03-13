import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiZWRkcm9zYWxlcyIsImEiOiJja3ltOHRqbnkwMDJqMnZsajV2NnNyY3AyIn0.NA2JwZ3kVv4Qp_fLyxelcw'
    }
})

export default directionsApi;
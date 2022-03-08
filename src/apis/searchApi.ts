import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoiZWRkcm9zYWxlcyIsImEiOiJja3ltOHRqbnkwMDJqMnZsajV2NnNyY3AyIn0.NA2JwZ3kVv4Qp_fLyxelcw'
    }
})

export default searchApi;
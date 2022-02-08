export const initialState = {covid: {}, mapCenter: {lng: 0, lat: 0}, zoom: 3};

export const selectedCountryReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        if (action.data.countryInfo) {
            return {
                covid: action.data,
                mapCenter: {
                    lng: action.data.countryInfo.long,
                    lat: action.data.countryInfo.lat,
                },
                zoom: 4
            }
        }

        return {...state, covid: action.data};
    }
    return initialState;
}
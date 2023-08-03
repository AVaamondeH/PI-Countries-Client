import { GET_ALL_COUNTRIES, FILTER_AND_ORDER, GET_ACTIVITIES, UPDATE_FILTERS, GET_ASSOCIATIONS, CURRENT_PAGE } from "./actions"

const initialState = {
    countries: [],
    totalPages: 0,
    pageNumbers: [],
    allCountries: [],
    activities: [],
    associations: [],
    currentPage: 1,
    filters: {
        continent: 'All',
        order: 'asc',
        activity: '',
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case FILTER_AND_ORDER:
            return {
                ...state,
                countries: action.payload.countriesData,
                totalPages: action.payload.totalData,
                pageNumbers: action.payload.enumeration,
            };

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };

        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
            };
        case GET_ASSOCIATIONS:
            return {
                ...state,
                associations: action.payload,
            };


        case UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };

        case CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };


        default:
            return { ...state }
    }
}

export default reducer;








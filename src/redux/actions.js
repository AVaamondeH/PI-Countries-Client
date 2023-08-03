import axios from "axios";

export const getAllCountries = () => {
   const endpoint = `http://localhost:3001/countries`;
   return async (dispatch) => {
      const { data } = await axios.get(endpoint)
         return dispatch({
            type: 'GET_ALL_COUNTRIES',
            payload: data.data,
         });
   };
}

export const filterAndOrder = (page, filters) => {
   const endpoint = `http://localhost:3001/countries?page=${page}`;
   const {continent, order, activity} = filters
   
   if (continent && order && !activity) {
      return async (dispatch) => {
         const { data } = await axios.get(`${endpoint}&continent=${continent}&order=${order}`)
         let { countriesData, totalData, enumeration} = data.data
         totalData = Math.ceil(totalData / 10)
            return dispatch({
               type: 'FILTER_AND_ORDER',
               payload: { countriesData, totalData, enumeration},
            });
      };
   }

   if (continent && order && activity) {
      return async (dispatch) => {
         const { data } = await axios.get(`${endpoint}&continent=${continent}&order=${order}&activity=${activity}`)
         if(!Object.keys(data.data).length) {
            return dispatch({
               type: 'FILTER_AND_ORDER',
               payload: { countriesData: [], 
                  totalData: 0, 
                  enumeration: []},
            });
         }
         let { countriesData, totalData, enumeration} = data.data
         totalData = Math.ceil(totalData / 10)
            return dispatch({
               type: 'FILTER_AND_ORDER',
               payload: { countriesData, totalData, enumeration},
            });
      };
   }


};

export const getActivities = () => {
   const endpoint = `http://localhost:3001/activities`;
   return async (dispatch) => {
      const { data } = await axios.get(endpoint)
         return dispatch({
            type: 'GET_ACTIVITIES',
            payload: data.data,
         });
   };
}

export const getAssociations = () => {
   const endpoint = `http://localhost:3001/associations`;
   return async (dispatch) => {
      const { data } = await axios.get(endpoint)
         return dispatch({
            type: 'GET_ASSOCIATIONS',
            payload: data.data,
         });
   };
}

export const updateFilters = (filters) => {
   return {
      type: 'UPDATE_FILTERS',
      payload: filters,
   };
};

export const setCurrentPage = (filters) => {
   return {
      type: 'CURRENT_PAGE',
      payload: filters,
   };
};

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const FILTER_AND_ORDER = "FILTER_AND_ORDER";
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const GET_ASSOCIATIONS = "GET_ASSOCIATIONS";
export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const CURRENT_PAGE = "CURRENT_PAGE";

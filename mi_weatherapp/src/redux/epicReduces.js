import { FETCH_FORECAST_DATA_SUCCESS, FETCH_FORECAST_DATA_ERROR } from './epicAction';

const initialState = {
  forecastData: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORECAST_DATA_SUCCESS:
      return {
        ...state,
        forecastData: action.payload,
        error: null
      };
    case FETCH_FORECAST_DATA_ERROR:
      return {
        ...state,
        forecastData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

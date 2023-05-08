// actions.js

export const FETCH_FORECAST_DATA = "FETCH_FORECAST_DATA";
export const FETCH_FORECAST_DATA_SUCCESS = "FETCH_FORECAST_DATA_SUCCESS";
export const FETCH_FORECAST_DATA_ERROR = "FETCH_FORECAST_DATA_ERROR";

export const fetchForecastData = (coords) => ({
  type: FETCH_FORECAST_DATA,
  payload: coords,
});


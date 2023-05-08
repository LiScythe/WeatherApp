// sagas.js

import { takeLatest, call, put, all } from "redux-saga/effects";
import moment from "moment";
import {
  FETCH_FORECAST_DATA,
  FETCH_FORECAST_DATA_SUCCESS,
  FETCH_FORECAST_DATA_ERROR,
} from "./epicAction";

function* fetchForecastData(action) {
  const { latitude, longitude } = action.payload;
  const apiKey = '25733e1a4ed1472fdeff48967db437fa'; // Replace with your Weather API key
  try {
    const response = yield call(
      fetch,
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );
    const result = yield call([response, "json"]);
    const data = result.list;
    const dailyData = [];
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const date = moment(item.dt_txt).format("YYYY-MM-DD");
      if (i === 0 || date !== dailyData[count - 1].date) {
        if (dailyData.length === 7) {
          break;
        }
        dailyData.push({ date, list: [] });
        count++;
      }
      dailyData[count - 1].list.push(item);
    }
    yield put({ type: FETCH_FORECAST_DATA_SUCCESS, payload: dailyData });
  } catch (error) {
    yield put({ type: FETCH_FORECAST_DATA_ERROR, payload: error });
  }
}

export function* watchFetchForecastData() {
  yield takeLatest(FETCH_FORECAST_DATA, fetchForecastData);
}

export default function* rootSaga() {
    yield all([
      watchFetchForecastData(),
    ]);
  }
  
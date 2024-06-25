import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchSlicedApi, insertSlicedApi } from "../api";
import {
  fetchSlicedRequest,
  fetchSlicedSuccess,
  fetchSlicedError,
  insertSlicedRequest,
  insertSlicedSuccess,
  insertSlicedError,
} from "../slices/sliced";

function* fetchSliced({ payload: { date } }) {
  try {
    const { data, isError } = yield call(fetchSlicedApi.run, date);
    if (isError) throw new Error();
    yield put(fetchSlicedSuccess({ data }));
  } catch (e) {
    yield put(fetchSlicedError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchSlicedApi.cancel);
    }
  }
}

export function* fetchSlicedSaga() {
  yield takeLatest(fetchSlicedRequest.toString(), fetchSliced);
}

function* insertSliced({ payload }) {
  try {
    const { data, isError } = yield call(insertSlicedApi.run, payload);
    if (isError) throw new Error();
    yield put(insertSlicedSuccess({ data }));
    payload.setOpenAlert(true);
  } catch (e) {
    yield put(insertSlicedError());
  } finally {
    if (yield cancelled()) {
      yield call(insertSlicedApi.cancel);
    }
  }
}

export function* insertSlicedSaga() {
  yield takeLatest(insertSlicedRequest.toString(), insertSliced);
}

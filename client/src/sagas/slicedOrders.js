import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchSlicedOrdersApi,
  insertSlicedOrdersApi,
  updateSlicedOrdersApi,
} from "../api";
import {
  fetchSlicedOrdersRequest,
  fetchSlicedOrdersSuccess,
  fetchSlicedOrdersError,
  insertSlicedOrdersRequest,
  insertSlicedOrdersSuccess,
  insertSlicedOrdersError,
  updateSlicedOrdersError,
  updateSlicedOrdersRequest,
  updateSlicedOrdersSuccess,
} from "../slices/slicedOrders";

// import { fetchSlicedRequest } from "../slices/sliced";

function* fetchSlicedOrders({ payload: { date } }) {
  try {
    const { data, isError } = yield call(fetchSlicedOrdersApi.run, date);
    if (isError) throw new Error();
    yield put(fetchSlicedOrdersSuccess({ data }));
  } catch (e) {
    yield put(fetchSlicedOrdersError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchSlicedOrdersApi.cancel);
    }
  }
}

export function* fetchSlicedOrdersSaga() {
  yield takeLatest(fetchSlicedOrdersRequest.toString(), fetchSlicedOrders);
}

function* insertSlicedOrders({ payload }) {
  try {
    const { data, isError } = yield call(
      insertSlicedOrdersApi.run,
      payload.newOrders
    );
    if (isError) throw new Error();
    yield put(insertSlicedOrdersSuccess({ data }));
    yield put(fetchSlicedOrdersRequest({ date: payload.date }));
    // yield put(fetchSlicedRequest({ date: payload.date }));
  } catch (e) {
    yield put(insertSlicedOrdersError());
  } finally {
    if (yield cancelled()) {
      yield call(insertSlicedOrdersApi.cancel);
    }
  }
}

export function* insertSlicedOrdersSaga() {
  yield takeLatest(insertSlicedOrdersRequest.toString(), insertSlicedOrders);
}

function* updateSlicedOrders({ payload: { date, setOpenAlertKanban } }) {
  try {
    const { data, isError } = yield call(updateSlicedOrdersApi.run, date);
    if (isError) throw new Error();
    yield put(updateSlicedOrdersSuccess({ data }));
    setOpenAlertKanban(true);
  } catch (e) {
    yield put(updateSlicedOrdersError());
  } finally {
    if (yield cancelled()) {
      yield call(updateSlicedOrdersApi.cancel);
    }
  }
}

export function* updateSlicedOrdersSaga() {
  yield takeLatest(updateSlicedOrdersRequest.toString(), updateSlicedOrders);
}

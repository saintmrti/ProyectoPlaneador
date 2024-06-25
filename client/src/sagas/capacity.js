import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchCapacityApi,
  insertCapacityApi,
  updateCapacityApi,
  deleteCapacityApi,
} from "../api";
import {
  fetchCapacityRequest,
  fetchCapacitySuccess,
  fetchCapacityError,
  insertCapacityRequest,
  insertCapacitySuccess,
  insertCapacityError,
  updateCapacityRequest,
  updateCapacitySuccess,
  updateCapacityError,
  deleteCapacityRequest,
  deleteCapacitySuccess,
  deleteCapacityError,
} from "../slices/capacity";

function* fetchCapacity() {
  try {
    const { data, isError } = yield call(fetchCapacityApi.run);
    if (isError) throw new Error();
    yield put(fetchCapacitySuccess({ data }));
  } catch (e) {
    yield put(fetchCapacityError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchCapacityApi.cancel);
    }
  }
}

export function* fetchCapacitySaga() {
  yield takeLatest(fetchCapacityRequest.toString(), fetchCapacity);
}

function* insertCapacity({ payload }) {
  try {
    const { data, isError } = yield call(insertCapacityApi.run, payload);
    if (isError) throw new Error();
    yield put(insertCapacitySuccess({ data }));
  } catch (e) {
    yield put(insertCapacityError());
  } finally {
    if (yield cancelled()) {
      yield call(insertCapacityApi.cancel);
    }
  }
}

export function* insertCapacitySaga() {
  yield takeLatest(insertCapacityRequest.toString(), insertCapacity);
}

function* updateCapacity({ payload }) {
  try {
    const { data, isError } = yield call(updateCapacityApi.run, payload);
    if (isError) throw new Error();
    yield put(updateCapacitySuccess({ data }));
  } catch (e) {
    yield put(updateCapacityError());
  } finally {
    if (yield cancelled()) {
      yield call(updateCapacityApi.cancel);
    }
  }
}

export function* updateCapacitySaga() {
  yield takeLatest(updateCapacityRequest.toString(), updateCapacity);
}

function* deleteCapacity({ payload: { idSku } }) {
  try {
    const { data, isError } = yield call(deleteCapacityApi.run, idSku);
    if (isError) throw new Error();
    yield put(deleteCapacitySuccess({ idSku: data }));
  } catch (e) {
    yield put(deleteCapacityError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteCapacityApi.cancel);
    }
  }
}

export function* deleteCapacitySaga() {
  yield takeLatest(deleteCapacityRequest.toString(), deleteCapacity);
}

import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchParametersApi,
  insertParametersApi,
  updateParametersApi,
  deleteParametersApi,
} from "../api";

import {
  fetchParametersRequest,
  fetchParametersSuccess,
  fetchParametersError,
  insertParametersRequest,
  insertParametersSuccess,
  insertParametersError,
  updateParametersRequest,
  updateParametersSuccess,
  updateParametersError,
  deleteParametersRequest,
  deleteParametersSuccess,
  deleteParametersError,
} from "../slices/parameters";

function* fetchParameters() {
  try {
    const { data, isError } = yield call(fetchParametersApi.run);
    if (isError) throw new Error();
    yield put(fetchParametersSuccess({ data }));
  } catch (e) {
    yield put(fetchParametersError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchParametersApi.cancel);
    }
  }
}

export function* fetchParametersSaga() {
  yield takeLatest(fetchParametersRequest.toString(), fetchParameters);
}

function* insertParameters({ payload }) {
  try {
    const { data, isError } = yield call(insertParametersApi.run, payload);
    if (isError) throw new Error();
    yield put(insertParametersSuccess({ data }));
  } catch (e) {
    yield put(insertParametersError());
  } finally {
    if (yield cancelled()) {
      yield call(insertParametersApi.cancel);
    }
  }
}

export function* insertParametersSaga() {
  yield takeLatest(insertParametersRequest.toString(), insertParameters);
}

function* updateParameters({ payload }) {
  try {
    const { data, isError } = yield call(updateParametersApi.run, payload);
    if (isError) throw new Error();
    yield put(updateParametersSuccess({ data }));
  } catch (e) {
    yield put(updateParametersError());
  } finally {
    if (yield cancelled()) {
      yield call(updateParametersApi.cancel);
    }
  }
}

export function* updateParametersSaga() {
  yield takeLatest(updateParametersRequest.toString(), updateParameters);
}

function* deleteParameters({ payload: { id } }) {
  try {
    const { data, isError } = yield call(deleteParametersApi.run, id);
    if (isError) throw new Error();
    yield put(deleteParametersSuccess({ id: data }));
  } catch (e) {
    yield put(deleteParametersError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteParametersApi.cancel);
    }
  }
}

export function* deleteParametersSaga() {
  yield takeLatest(deleteParametersRequest.toString(), deleteParameters);
}

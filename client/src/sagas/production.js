import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchProductionApi,
  insertProductionApi,
  updateProductionApi,
  deleteProductionApi,
  hideProductionApi,
  updateSequenceApi,
} from "../api";
import {
  fetchProductionRequest,
  fetchProductionSuccess,
  fetchProductionError,
  insertProductionRequest,
  insertProductionSuccess,
  insertProductionError,
  updateProductionRequest,
  updateProductionSuccess,
  updateProductionError,
  deleteProductionRequest,
  deleteProductionSuccess,
  deleteProductionError,
  hideProductionRequest,
  hideProductionSuccess,
  hideProductionError,
  sequenceProductionRequest,
  sequenceProductionSuccess,
  sequenceProductionError,
} from "../slices/production";

function* fetchProduction({ payload: { date } }) {
  try {
    const { data, isError } = yield call(fetchProductionApi.run, date);
    if (isError) throw new Error();
    yield put(fetchProductionSuccess({ data }));
  } catch (e) {
    yield put(fetchProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchProductionApi.cancel);
    }
  }
}

export function* fetchProductionSaga() {
  yield takeLatest(fetchProductionRequest.toString(), fetchProduction);
}

function* insertProduction({ payload }) {
  try {
    const { data, isError } = yield call(insertProductionApi.run, payload);
    if (isError) throw new Error();
    yield put(insertProductionSuccess({ data }));
  } catch (e) {
    yield put(insertProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(insertProductionApi.cancel);
    }
  }
}

export function* insertProductionSaga() {
  yield takeLatest(insertProductionRequest.toString(), insertProduction);
}

function* updateProduction({ payload: { date, setOpenAlert } }) {
  try {
    const { data, isError } = yield call(updateProductionApi.run, date);
    if (isError) throw new Error();
    yield put(updateProductionSuccess({ data }));
    setOpenAlert(true);
  } catch (e) {
    yield put(updateProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(updateProductionApi.cancel);
    }
  }
}

export function* updateProductionSaga() {
  yield takeLatest(updateProductionRequest.toString(), updateProduction);
}

function* deleteProduction({ payload: { idProd } }) {
  try {
    const { data, isError } = yield call(deleteProductionApi.run, idProd);
    if (isError) throw new Error();
    yield put(deleteProductionSuccess({ data }));
  } catch (e) {
    yield put(deleteProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteProductionApi.cancel);
    }
  }
}

export function* deleteProductionSaga() {
  yield takeLatest(deleteProductionRequest.toString(), deleteProduction);
}

function* hideProduction({ payload: { idProd } }) {
  try {
    const { data, isError } = yield call(hideProductionApi.run, idProd);
    if (isError) throw new Error();
    yield put(hideProductionSuccess({ data }));
  } catch (e) {
    yield put(hideProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(hideProductionApi.cancel);
    }
  }
}

export function* hideProductionSaga() {
  yield takeLatest(hideProductionRequest.toString(), hideProduction);
}

function* updateSequence({ payload }) {
  try {
    const { data, isError } = yield call(updateSequenceApi.run, payload);
    if (isError) throw new Error();
    yield put(sequenceProductionSuccess({ data }));
    yield put(fetchProductionRequest({ date: payload?.date }));
    yield;
  } catch (e) {
    yield put(sequenceProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(updateSequenceApi.cancel);
    }
  }
}

export function* updateSequenceSaga() {
  yield takeLatest(sequenceProductionRequest.toString(), updateSequence);
}

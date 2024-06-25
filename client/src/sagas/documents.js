import { takeLatest, call, put, cancelled } from "redux-saga/effects";
import {
  invDocumentsApi,
  reqDocumentsApi,
  wipDocumentsApi,
  weekDocumentsApi,
} from "../api";
import {
  invDocumentsRequest,
  invDocumentsSuccess,
  invDocumentsError,
  reqDocumentsRequest,
  reqDocumentsSuccess,
  reqDocumentsError,
  wipDocumentsRequest,
  wipDocumentsSuccess,
  wipDocumentsError,
  weekDocumentsRequest,
  weekDocumentsSuccess,
  weekDocumentsError,
} from "../slices/documents";

function* invDocuments({ payload }) {
  try {
    const { data, isError } = yield call(invDocumentsApi.run, payload);
    if (isError) throw new Error();
    yield put(invDocumentsSuccess({ data }));
    yield put(reqDocumentsRequest(payload));
  } catch (e) {
    yield put(invDocumentsError());
  } finally {
    if (yield cancelled()) {
      yield call(invDocumentsApi.cancel);
    }
  }
}

export function* invDocumentsSaga() {
  yield takeLatest(invDocumentsRequest.toString(), invDocuments);
}

function* reqDocuments({ payload }) {
  try {
    const { data, isError } = yield call(reqDocumentsApi.run, payload);
    if (isError) throw new Error();
    yield put(reqDocumentsSuccess({ data }));
    yield put(wipDocumentsRequest(payload));
  } catch (e) {
    yield put(reqDocumentsError());
  } finally {
    if (yield cancelled()) {
      yield call(reqDocumentsApi.cancel);
    }
  }
}

export function* reqDocumentsSaga() {
  yield takeLatest(reqDocumentsRequest.toString(), reqDocuments);
}

function* wipDocuments({ payload }) {
  try {
    const { data, isError } = yield call(wipDocumentsApi.run, payload);
    if (isError) throw new Error();
    yield put(wipDocumentsSuccess({ data }));
    yield put(weekDocumentsRequest(payload));
  } catch (e) {
    yield put(wipDocumentsError());
  } finally {
    if (yield cancelled()) {
      yield call(wipDocumentsApi.cancel);
    }
  }
}

export function* wipDocumentsSaga() {
  yield takeLatest(wipDocumentsRequest.toString(), wipDocuments);
}

function* weekDocuments({ payload }) {
  try {
    const { data, isError } = yield call(weekDocumentsApi.run, payload);
    if (isError) throw new Error();
    yield put(weekDocumentsSuccess({ data }));
  } catch (e) {
    yield put(weekDocumentsError());
  } finally {
    if (yield cancelled()) {
      yield call(weekDocumentsApi.cancel);
    }
  }
}

export function* weekDocumentsSaga() {
  yield takeLatest(weekDocumentsRequest.toString(), weekDocuments);
}

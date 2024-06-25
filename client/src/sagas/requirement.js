import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchRequirementApi,
  insertRequirementApi,
  deleteRequirementApi,
} from "../api";
import {
  fetchRequirementRequest,
  fetchRequirementSuccess,
  fetchRequirementError,
  insertRequirementRequest,
  insertRequirementSuccess,
  insertRequirementError,
  deleteRequirementRequest,
  deleteRequirementSuccess,
  deleteRequirementError,
} from "../slices/requirement";

import { fetchSlicedRequest } from "../slices/sliced";
import { fetchSlicedOrdersRequest } from "../slices/slicedOrders";

function* fetchRequirement({ payload: { date } }) {
  try {
    const { data, isError } = yield call(fetchRequirementApi.run, date);
    if (isError) throw new Error();
    yield put(fetchRequirementSuccess({ data }));
  } catch (e) {
    yield put(fetchRequirementError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchRequirementApi.cancel);
    }
  }
}

export function* fetchRequirementSaga() {
  yield takeLatest(fetchRequirementRequest.toString(), fetchRequirement);
}

function* insertRequirement({ payload }) {
  try {
    const { data, isError } = yield call(insertRequirementApi.run, payload);
    if (isError) throw new Error();
    yield put(insertRequirementSuccess({ data }));
  } catch (e) {
    yield put(insertRequirementError());
  } finally {
    if (yield cancelled()) {
      yield call(insertRequirementApi.cancel);
    }
  }
}

export function* insertRequirementSaga() {
  yield takeLatest(insertRequirementRequest.toString(), insertRequirement);
}

function* deleteRequirement({ payload: { date } }) {
  try {
    const { data, isError } = yield call(deleteRequirementApi.run, date);
    if (isError) throw new Error();
    yield put(deleteRequirementSuccess({ data }));
    yield put(fetchSlicedRequest({ date }));
    yield put(fetchSlicedOrdersRequest({ date }));
  } catch (e) {
    yield put(deleteRequirementError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteRequirementApi.cancel);
    }
  }
}

export function* deleteRequirementSaga() {
  yield takeLatest(deleteRequirementRequest.toString(), deleteRequirement);
}

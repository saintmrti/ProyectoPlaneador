import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchProductsApi, updateProductsApi } from "../api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
  updateProductsRequest,
  updateProductsSuccess,
  updateProductsError,
} from "../slices/products";

function* fetchProducts() {
  try {
    const { data, isError } = yield call(fetchProductsApi.run);
    if (isError) throw new Error();
    yield put(fetchProductsSuccess({ data }));
  } catch (e) {
    yield put(fetchProductsError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchProductsApi.cancel);
    }
  }
}

export function* fetchProductsSaga() {
  yield takeLatest(fetchProductsRequest.toString(), fetchProducts);
}

// function* insertProducts({ payload }) {
//   try {
//     const { data, isError } = yield call(insertProductsApi.run, payload);
//     if (isError) throw new Error();
//     yield put(insertProductsSuccess({ data }));
//   } catch (e) {
//     yield put(insertProductsError());
//   } finally {
//     if (yield cancelled()) {
//       yield call(insertProductsApi.cancel);
//     }
//   }
// }

// export function* insertProductsSaga() {
//   yield takeLatest(insertProductsRequest.toString(), insertProducts);
// }

function* updateProducts({ payload }) {
  try {
    const { data, isError } = yield call(updateProductsApi.run, payload);
    if (isError) throw new Error();
    yield put(updateProductsSuccess({ data }));
  } catch (e) {
    yield put(updateProductsError());
  } finally {
    if (yield cancelled()) {
      yield call(updateProductsApi.cancel);
    }
  }
}

export function* updateProductsSaga() {
  yield takeLatest(updateProductsRequest.toString(), updateProducts);
}

// function* deleteProducts({ payload: { idSku } }) {
//   try {
//     const { data, isError } = yield call(deleteProductsApi.run, idSku);
//     if (isError) throw new Error();
//     yield put(deleteProductsSuccess({ idSku: data }));
//   } catch (e) {
//     yield put(deleteProductsError());
//   } finally {
//     if (yield cancelled()) {
//       yield call(deleteProductsApi.cancel);
//     }
//   }
// }

// export function* deleteProductsSaga() {
//   yield takeLatest(deleteProductsRequest.toString(), deleteProducts);
// }

import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchProjectsApi,
  insertProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from "../api";
import {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsError,
  insertProjectError,
  insertProjectRequest,
  insertProjectSuccess,
  updateProjectError,
  updateProjectRequest,
  updateProjectSuccess,
  deleteProjectError,
  deleteProjectRequest,
  deleteProjectSuccess,
} from "../slices/projects";

function* fetchProjects() {
  try {
    const { data, isError } = yield call(fetchProjectsApi.run);
    if (isError) throw new Error();
    yield put(fetchProjectsSuccess({ data }));
  } catch (e) {
    yield put(fetchProjectsError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchProjectsApi.cancel);
    }
  }
}

export function* fetchProjectsSaga() {
  yield takeLatest(fetchProjectsRequest.toString(), fetchProjects);
}

function* insertProject({ payload }) {
  try {
    const { data, isError } = yield call(insertProjectApi.run, payload);
    if (isError) throw new Error();
    yield put(insertProjectSuccess({ data }));
  } catch (e) {
    yield put(insertProjectError());
  } finally {
    if (yield cancelled()) {
      yield call(insertProjectApi.cancel);
    }
  }
}

export function* insertProjectSaga() {
  yield takeLatest(insertProjectRequest.toString(), insertProject);
}

function* updateProject({ payload }) {
  try {
    const { data, isError } = yield call(updateProjectApi.run, payload);
    if (isError) throw new Error();
    yield put(updateProjectSuccess({ data }));
  } catch (e) {
    yield put(updateProjectError());
  } finally {
    if (yield cancelled()) {
      yield call(updateProjectApi.cancel);
    }
  }
}

export function* updateProjectSaga() {
  yield takeLatest(updateProjectRequest.toString(), updateProject);
}

function* deleteProject({ payload: { idProyecto } }) {
  try {
    const { data, isError } = yield call(deleteProjectApi.run, idProyecto);
    if (isError) throw new Error();
    yield put(deleteProjectSuccess({ idProyecto: data }));
  } catch (e) {
    yield put(deleteProjectError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteProjectApi.cancel);
    }
  }
}

export function* deleteProjectSaga() {
  yield takeLatest(deleteProjectRequest.toString(), deleteProject);
}

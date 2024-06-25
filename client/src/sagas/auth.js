import { takeLatest, call, put } from 'redux-saga/effects';
import { authRequest, authSuccess, authError } from '../slices/auth';
import { authSignInApi } from '../api';

function* authSignIn({ payload }) {
    try {
        const { data, isError, status } = yield call(authSignInApi.run, payload);
        if(isError) throw new Error(status);
        yield put(authSuccess(data.token));
    } catch (error) {
        yield put(authError(error.message));
    } 
}

export function* authSignInSaga() {
    yield takeLatest(authRequest.toString(), authSignIn);
}